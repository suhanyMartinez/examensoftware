import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tu-proyecto.supabase.co'
const supabaseKey = 'tu-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)