import { createClient } from '@supabase/supabase-js'

const URL = 'https://udhdhkarxwxzjivlzaoq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkaGRoa2FyeHd4emppdmx6YW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2NTYxMjAsImV4cCI6MTk5NjIzMjEyMH0.EwHvIiUOSYJG72pJPMfhJr8ucvPdQv_vy-E-OQY089A';

export const supabase = createClient(URL, API_KEY);