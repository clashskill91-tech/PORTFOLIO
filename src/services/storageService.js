import { supabase } from '../lib/supabase'
const BUCKET = 'portfolio-images'
export function validateImage(file) {
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) return 'INVALID_TYPE'
  if (file.size > 3 * 1024 * 1024) return 'TOO_LARGE'
  return null
}
export async function uploadImage(file) {
  const ext = file.name.split('.').pop().toLowerCase()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: '31536000' })
  if (error) { console.error(error); throw new Error('UPLOAD_FAILED') }
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}
