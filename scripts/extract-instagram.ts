/**
 * Script para extrair dados do Instagram @clicknautico.kiteschool
 * Usa instagram-scraper-api (sem login necessário)
 */

import { instagram } from 'instagram-scraper-api'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const USERNAME = 'clicknautico.kiteschool'
const OUTPUT_DIR = path.join(__dirname, '../data')

interface PostData {
  id: string
  shortcode: string
  url: string
  imageUrl: string
  thumbnailUrl?: string
  caption: string
  hashtags: string[]
  likes: number
  comments: number
  timestamp: string
  type: 'image' | 'video' | 'carousel'
  isVideo: boolean
  videoUrl?: string
}

interface ProfileData {
  username: string
  fullName: string
  biography: string
  followersCount: number
  followingCount: number
  postsCount: number
  profilePicUrl: string
  isVerified: boolean
  externalUrl?: string
  extractedAt: string
}

function extractHashtags(caption: string): string[] {
  const matches = caption.match(/#[\w\u00C0-\u017F]+/g)
  return matches || []
}

async function main() {
  console.log('🚀 Iniciando extração do Instagram @clicknautico.kiteschool\n')

  // Criar diretório de output
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  try {
    console.log(`📱 Extraindo dados de @${USERNAME}...`)
    const data = await instagram.user(USERNAME)

    console.log('\n📊 Dados do usuário extraídos:')
    console.log(JSON.stringify(data, null, 2))

    // Salvar dados brutos
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'raw-instagram-data.json'),
      JSON.stringify(data, null, 2)
    )
    console.log('\n✅ Dados salvos em data/raw-instagram-data.json')

    // Processar perfil se disponível
    if (data) {
      const profile: ProfileData = {
        username: (data as any).username || USERNAME,
        fullName: (data as any).fullName || '',
        biography: (data as any).biography || '',
        followersCount: (data as any).followersCount || 0,
        followingCount: (data as any).followingCount || 0,
        postsCount: (data as any).postsCount || 0,
        profilePicUrl: (data as any).profilePicHdUrl || (data as any).profilePicUrl || '',
        isVerified: (data as any).isVerified || false,
        externalUrl: (data as any).externalUrl || undefined,
        extractedAt: new Date().toISOString()
      }

      fs.writeFileSync(
        path.join(OUTPUT_DIR, 'profile.json'),
        JSON.stringify(profile, null, 2)
      )

      console.log(`\n📊 Perfil processado:`)
      console.log(`   - Username: ${profile.username}`)
      console.log(`   - Nome: ${profile.fullName}`)
      console.log(`   - Followers: ${profile.followersCount.toLocaleString()}`)
      console.log(`   - Posts: ${profile.postsCount.toLocaleString()}`)

      // Processar posts se disponíveis
      const rawPosts = (data as any).posts || (data as any).edges || []
      if (rawPosts.length > 0) {
        const posts: PostData[] = rawPosts.map((post: any) => {
          const node = post.node || post
          const caption = node.caption ||
            node.edge_media_to_caption?.edges?.[0]?.node?.text || ''

          return {
            id: node.id || '',
            shortcode: node.shortcode || node.code || '',
            url: node.shortcode ? `https://www.instagram.com/p/${node.shortcode}/` : '',
            imageUrl: node.displayUrl || node.display_url || '',
            thumbnailUrl: node.thumbnailUrl || node.thumbnail_src || '',
            caption,
            hashtags: extractHashtags(caption),
            likes: node.likesCount || node.edge_liked_by?.count || 0,
            comments: node.commentsCount || node.edge_media_to_comment?.count || 0,
            timestamp: node.timestamp ? new Date(node.timestamp * 1000).toISOString() :
              new Date().toISOString(),
            type: node.isVideo ? 'video' : (node.sidecarChildren ? 'carousel' : 'image'),
            isVideo: node.isVideo || false,
            videoUrl: node.videoUrl || undefined
          }
        })

        fs.writeFileSync(
          path.join(OUTPUT_DIR, 'posts.json'),
          JSON.stringify(posts, null, 2)
        )
        console.log(`\n📸 ${posts.length} posts salvos`)

        // Top engajados
        const topEngaged = [...posts]
          .sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
          .slice(0, 10)

        fs.writeFileSync(
          path.join(OUTPUT_DIR, 'top-engaged.json'),
          JSON.stringify(topEngaged, null, 2)
        )
        console.log(`🔥 Top 10 mais engajados salvos`)

        // Summary
        const summary = {
          extractedAt: new Date().toISOString(),
          profile: {
            username: profile.username,
            followers: profile.followersCount,
            posts: profile.postsCount
          },
          postsExtracted: posts.length,
          totalLikes: posts.reduce((sum, p) => sum + p.likes, 0),
          totalComments: posts.reduce((sum, p) => sum + p.comments, 0),
          topHashtags: getTopHashtags(posts, 10)
        }

        fs.writeFileSync(
          path.join(OUTPUT_DIR, 'summary.json'),
          JSON.stringify(summary, null, 2)
        )
      }
    }

    console.log('\n✨ Extração completa!')
    console.log(`   📁 Dados salvos em: ${OUTPUT_DIR}`)

  } catch (error) {
    console.error('❌ Erro na extração:', error)
  }
}

function getTopHashtags(posts: PostData[], limit: number): { tag: string; count: number }[] {
  const hashtagCount: Record<string, number> = {}

  for (const post of posts) {
    for (const tag of post.hashtags) {
      hashtagCount[tag] = (hashtagCount[tag] || 0) + 1
    }
  }

  return Object.entries(hashtagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }))
}

main().catch(console.error)
