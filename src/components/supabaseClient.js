import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rdxuvorwdagqfnzoiesp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkeHV2b3J3ZGFncWZuem9pZXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc0NjMyOTIsImV4cCI6MTk2MzAzOTI5Mn0.U21FG9mpoTPo2hySXpRRYIqBoTSwSY8VTlpUKLDYYws'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)