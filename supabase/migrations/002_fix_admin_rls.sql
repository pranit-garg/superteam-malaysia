-- Fix infinite recursion in admin_profiles RLS policy
DROP POLICY IF EXISTS "Admins have full access to admin_profiles" ON public.admin_profiles;

-- Use a security definer function to avoid recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid() AND role = 'admin');
$$;

-- Recreate policy using the function (no recursion since SECURITY DEFINER bypasses RLS)
CREATE POLICY "Admins have full access to admin_profiles" ON public.admin_profiles
  FOR ALL USING (public.is_admin());
