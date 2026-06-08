import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://Kns7mdVECtQ7S8LuOsH4.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Kns7mdVECtQ7S8LuOsH4OA_R3bgnGxC';

// Initialize your Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveGeneratedBlueprints(userRawInput: string, aiOutputs: any) {
  const { data, error } = await supabase
    .from('promptforge') // Matches your newly created table name
    .insert([
      {
        raw_input: userRawInput,
        blueprints: aiOutputs // Pass the object containing chatgpt, claude, and gemini fields
      }
    ])
    .select();

  if (error) {
    console.error('Error storing data to Supabase:', error.message);
    return null;
  }
  
  console.log('Successfully saved blueprint data!', data);
  return data;
}
