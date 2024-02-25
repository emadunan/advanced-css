import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ltlxumkebhmhmmcfobuk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0bHh1bWtlYmhtaG1tY2ZvYnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4Njk5MDgsImV4cCI6MjAyNDQ0NTkwOH0.42A98r7QYLTcfx371_itk-eMLh43HqRPyrehQXpiAFU";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
