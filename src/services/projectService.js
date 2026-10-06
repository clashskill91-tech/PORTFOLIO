import { supabase } from '../lib/supabase'
const fail = (e, msg) => { console.error(e); throw new Error(msg) }
export async function getProjects({ featured } = {}) {
  let q = supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (featured) q = q.eq('featured', true)
  const { data, error } = await q
  if (error) fail(error, 'LOAD_FAILED')
  return data
}
export async function getProject(id) {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
  if (error) fail(error, 'LOAD_FAILED')
  return data
}
export async function createProject(p) {
  const { data, error } = await supabase.from('projects').insert(p).select().single()
  if (error) fail(error, 'CREATE_FAILED')
  return data
}
export async function updateProject(id, p) {
  const { data, error } = await supabase.from('projects').update(p).eq('id', id).select().single()
  if (error) fail(error, 'UPDATE_FAILED')
  return data
}
export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) fail(error, 'DELETE_FAILED')
}
