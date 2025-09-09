import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kqlaeqfgolgrqpqvccyj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxbGFlcWZnb2xncnFwcXZjY3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwOTUxMzQsImV4cCI6MjA3MjY3MTEzNH0.5earLywdP-KybLHILeFJYqKnmxPZIBymEor3VPnM3mE' // paste from Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
