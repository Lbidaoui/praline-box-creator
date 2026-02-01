-- Create orders table for shareable chocolate box orders
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(8) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  box_name VARCHAR(100) NOT NULL,
  box_price DECIMAL(10,2) NOT NULL,
  box_weight INTEGER NOT NULL,
  chocolates_count INTEGER NOT NULL,
  chocolates_data JSONB NOT NULL DEFAULT '[]',
  message TEXT,
  recipient_name VARCHAR(100),
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone can view orders (for sharing and leaderboard)
CREATE POLICY "Orders are publicly viewable" 
ON public.orders 
FOR SELECT 
USING (true);

-- Anyone can create orders (no auth required for this fun feature)
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Anyone can increment view count
CREATE POLICY "Anyone can update view count" 
ON public.orders 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Create index for leaderboard queries
CREATE INDEX idx_orders_view_count ON public.orders(view_count DESC);
CREATE INDEX idx_orders_code ON public.orders(code);

-- Function to generate unique 6-char code
CREATE OR REPLACE FUNCTION public.generate_order_code()
RETURNS VARCHAR(8) AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result VARCHAR(8) := '';
  i INTEGER;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql SET search_path = public;