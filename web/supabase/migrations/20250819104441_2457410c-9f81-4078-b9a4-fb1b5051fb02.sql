-- Create table for character progress
CREATE TABLE public.character_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  character_name TEXT NOT NULL,
  title TEXT NOT NULL,
  current_grade INTEGER NOT NULL DEFAULT 1,
  total_pes INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  skills JSONB NOT NULL DEFAULT '{}',
  virtues JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.character_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own character progress" 
ON public.character_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own character progress" 
ON public.character_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own character progress" 
ON public.character_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own character progress" 
ON public.character_progress 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_character_progress_updated_at
BEFORE UPDATE ON public.character_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();