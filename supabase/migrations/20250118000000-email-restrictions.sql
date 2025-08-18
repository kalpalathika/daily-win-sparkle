-- Create allowed emails table for whitelist functionality
CREATE TABLE public.allowed_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  added_by TEXT, -- Optional: track who added this email
  notes TEXT, -- Optional: reason for allowing this email
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on allowed_emails table
ALTER TABLE public.allowed_emails ENABLE ROW LEVEL SECURITY;

-- Only allow admins to manage allowed emails (you can customize this policy)
CREATE POLICY "Only authenticated users can view allowed emails" 
ON public.allowed_emails 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create function to check if email is allowed
CREATE OR REPLACE FUNCTION public.check_email_allowed()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  -- Check if email exists in allowed list
  IF NOT EXISTS (
    SELECT 1 FROM public.allowed_emails 
    WHERE LOWER(email) = LOWER(NEW.email)
  ) THEN
    RAISE EXCEPTION 'Access restricted: Email % is not authorized to create an account. Please contact an administrator.', NEW.email
    USING ERRCODE = 'insufficient_privilege';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to enforce email restrictions on user signup
CREATE TRIGGER enforce_email_restrictions
  BEFORE INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.check_email_allowed();

-- Insert initial allowed emails (add your emails here)
INSERT INTO public.allowed_emails (email, added_by, notes) VALUES 
  ('kalpalathikaramanujam@gmail.com', 'system', 'Project owner'),
  ('demo@example.com', 'system', 'Demo account for testing');

-- Create function to add allowed emails (for future use)
CREATE OR REPLACE FUNCTION public.add_allowed_email(
  new_email TEXT,
  added_by_user TEXT DEFAULT NULL,
  email_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.allowed_emails (email, added_by, notes)
  VALUES (LOWER(new_email), added_by_user, email_notes)
  RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$;

-- Create function to remove allowed emails (for future use)
CREATE OR REPLACE FUNCTION public.remove_allowed_email(email_to_remove TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.allowed_emails 
  WHERE LOWER(email) = LOWER(email_to_remove);
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count > 0;
END;
$$;