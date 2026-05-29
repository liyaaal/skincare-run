import { useState, useEffect, useRef } from "react";
import { Sparkles, Droplets, Leaf, ArrowRight, Star, ShoppingBag, Heart, ChevronDown, Play } from "lucide-react";

const IMGS = {
  hero: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=85&fit=crop",
  model: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80&fit=crop",
  cream1: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=85&fit=crop",
  serum: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=85&fit=crop",
  product1: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&q=85&fit=crop",
  product2: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=700&q=85&fit=crop",
  texture1: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=85&fit=crop",
  texture2: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80&fit=crop",
  texture3: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=85&fit=crop",
  texture4: "https://images.unsplash.com/photo-1526758097130-bab247274f58?w=500&q=85&fit=crop",
  drops: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=85&fit=crop",
  glow: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=700&q=85&fit=crop",
  // --- user uploaded product images ---
  img1_serum:     "./img1_serum.jpg",       // ALo radiance serum dropper  → hero heading
  img2_foam:      "./img2_foam.jpg",        // Korean foam cleanser         → gallery Silk Foam
  img3_luxury:    "./img3_luxury.jpg",      // Cream jar                    → philosophy quote bg
  img4_cream:     "./img4_cream.jpg",       // Cream jar                    → gallery Velvet Cream
  img5_drops:     "./img5_drops.jpg",       // Omnilux serum drops          → gallery Serum Drops
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transforms[direction],
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

export default function SkincareApp() {
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const products = [
    { name: "Velvet Serum", tagline: "Pure Radiance Formula", price: "$148", note: "30ml", color: "#D4A88A", img: IMGS.serum },
    { name: "Cloud Cream", tagline: "Deep Hydration Veil", price: "$124", note: "50ml", color: "#C4B5A8", img: IMGS.cream1 },
    { name: "Glow Oil", tagline: "Luminous Skin Elixir", price: "$168", note: "25ml", color: "#B89F8A", img: IMGS.drops },
  ];

  const gallery = [
    { img: IMGS.texture1, label: "Silk Foam", span: "row-span-2" },
    { img: IMGS.product1, label: "Morning Ritual" },
    { img: IMGS.cream1, label: "Velvet Texture" },
    { img: IMGS.drops, label: "Serum Drops", span: "col-span-2" },
    { img: IMGS.texture3, label: "Glow Ritual" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF6F1", color: "#1A1005", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #FAF6F1; }
        ::-webkit-scrollbar-thumb { background: #D4A88A; border-radius: 2px; }
        .serif { font-family: 'Playfair Display', serif; }
        .hover-scale { transition: transform 0.55s cubic-bezier(.22,1,.36,1), box-shadow 0.55s ease; }
        .hover-scale:hover { transform: scale(1.03); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
        .btn-primary { background: #1A1005; color: #FAF6F1; border: none; padding: 14px 32px; font-family: 'DM Sans', sans-serif; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 10px; }
        .btn-primary:hover { background: #3D2B1F; transform: translateY(-1px); }
        .btn-ghost { background: transparent; color: #1A1005; border: 1px solid #1A1005; padding: 13px 30px; font-family: 'DM Sans', sans-serif; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 10px; }
        .btn-ghost:hover { background: #1A1005; color: #FAF6F1; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .float { animation: float 6s ease-in-out infinite; }
        .float-slow { animation: float 9s ease-in-out infinite 1s; }
        .img-cover { width: 100%; height: 100%; object-fit: cover; }
        .tag { display: inline-block; background: #EAD9C8; color: #6B4F3A; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; padding: 5px 14px; }
        .star { color: #C4944A; font-size: 13px; }
        .product-tab { padding: 10px 20px; border: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; color: #9A8A7A; transition: all 0.3s; border-bottom: 2px solid transparent; }
        .product-tab.active { color: #1A1005; border-bottom: 2px solid #D4A88A; }
        .gallery-img-wrap { overflow: hidden; position: relative; cursor: pointer; }
        .gallery-img-wrap img { transition: transform 0.8s cubic-bezier(.22,1,.36,1); }
        .gallery-img-wrap:hover img { transform: scale(1.08); }
        .gallery-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; background: linear-gradient(transparent, rgba(0,0,0,0.45)); color: white; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0; transition: opacity 0.4s; }
        .gallery-img-wrap:hover .gallery-label { opacity: 1; }
        .review-card { background: white; padding: 28px 32px; border-left: 3px solid #D4A88A; }
        .ingredient-pill { display: inline-flex; align-items: center; gap: 8px; background: #EAD9C8; padding: 8px 16px; font-size: 13px; color: #6B4F3A; margin: 4px; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 48px",
        background: scrolled ? "rgba(250,246,241,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,168,138,0.2)" : "none",
        transition: "all 0.5s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 70,
      }}>
        <span className="serif" style={{ fontSize: 22, letterSpacing: "0.04em", fontWeight: 400 }}>LUMÉ</span>
        <div style={{ display: "flex", gap: 36, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {["Ritual", "Products", "Story", "Journal"].map(l => (
            <a key={l} href="#" style={{ color: "#1A1005", textDecoration: "none", opacity: 0.65, transition: "opacity 0.2s" }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.65}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Heart size={17} style={{ opacity: 0.6 }} />
          <ShoppingBag size={17} style={{ opacity: 0.6 }} />
          <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 12 }}>Shop Now</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", paddingTop: 70 }}>
        {/* LEFT — image */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: 600 }}>
          <img src={IMGS.hero} alt="hero" className="img-cover" style={{ position: "absolute", inset: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #FAF6F1)" }} />

          {/* Floating badge */}
          <div className="float" style={{
            position: "absolute", bottom: "15%", left: "8%",
            background: "rgba(250,246,241,0.92)", backdropFilter: "blur(12px)",
            padding: "16px 22px", boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A8A7A", marginBottom: 4 }}>Clinically proven</div>
            <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#1A1005" }}>94%</div>
            <div style={{ fontSize: 12, color: "#6B4F3A" }}>Reported visible glow</div>
          </div>

          {/* Top tag */}
          <div className="float-slow" style={{
            position: "absolute", top: "12%", right: "12%",
            background: "#1A1005", color: "#FAF6F1",
            padding: "12px 18px",
            display: "flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: "0.08em"
          }}>
            <Sparkles size={13} /> New Drop 2025
          </div>
        </div>

        {/* RIGHT — text */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 64px 60px 48px" }}>
          <div style={{ animation: "fadeSlideIn 1s ease 0.1s both" }}>
            <div className="tag" style={{ marginBottom: 28 }}>The Ritual Collection</div>
          </div>
          <div style={{ animation: "fadeSlideIn 1s ease 0.3s both", display: "flex", alignItems: "flex-start", gap: 28, marginBottom: 28 }}>
            <h1 className="serif" style={{ fontSize: "clamp(44px, 5vw, 68px)", lineHeight: 1.1, fontWeight: 400, flex: 1 }}>
              Skin that<br />
              <em>remembers</em><br />
              how to glow.
            </h1>
            <div style={{ flexShrink: 0, width: 140, height: 200, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}>
              <img src={IMGS.img1_serum} alt="Radiance Serum" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ animation: "fadeSlideIn 1s ease 0.5s both" }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#6B4F3A", maxWidth: 380, marginBottom: 40 }}>
              Formulated with rare botanical actives and zero compromise. A skincare ritual distilled to its most luminous, essential form.
            </p>
          </div>
          <div style={{ animation: "fadeSlideIn 1s ease 0.7s both", display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-primary">Explore the Ritual <ArrowRight size={15} /></button>
            <button className="btn-ghost"><Play size={14} /> Watch the Film</button>
          </div>

          {/* Social proof */}
          <div style={{ animation: "fadeSlideIn 1s ease 0.9s both", marginTop: 52, paddingTop: 32, borderTop: "1px solid #E8D8C8" }}>
            <div style={{ display: "flex", gap: 36 }}>
              {[["12K+", "Reviews"], ["4.9", "Rating"], ["30+", "Botanicals"]].map(([n, l]) => (
                <div key={l}>
                  <div className="serif" style={{ fontSize: 26, fontWeight: 700, color: "#1A1005" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#9A8A7A", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div style={{ background: "#1A1005", color: "#EAD9C8", padding: "14px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", animation: "marquee 22s linear infinite" }}>
          {Array(8).fill(0).map((_, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24, marginRight: 48, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              <Sparkles size={11} /> Clean Beauty <Leaf size={11} /> Botanicals <Droplets size={11} /> Science–Led Ritual
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* PRODUCTS */}
      <section style={{ padding: "110px 80px", background: "#FAF6F1" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
            <div>
              <div className="tag" style={{ marginBottom: 16 }}>Signature Formulas</div>
              <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.1 }}>
                Each drop,<br /><em>deliberate.</em>
              </h2>
            </div>
            <button className="btn-ghost" style={{ marginBottom: 8 }}>View All Products <ArrowRight size={14} /></button>
          </div>
        </FadeIn>

        {/* Product tabs */}
        <div style={{ borderBottom: "1px solid #E8D8C8", marginBottom: 48, display: "flex", gap: 8 }}>
          {products.map((p, i) => (
            <button key={i} className={`product-tab ${activeProduct === i ? "active" : ""}`}
              onClick={() => setActiveProduct(i)}>{p.name}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          {/* Product image */}
          <FadeIn direction="left">
            <div style={{ position: "relative" }}>
              <div className="hover-scale" style={{ height: 520, overflow: "hidden" }}>
                <img src={products[activeProduct].img} alt={products[activeProduct].name}
                  className="img-cover" style={{ transition: "all 0.6s ease" }} />
              </div>
              <div style={{
                position: "absolute", top: -20, right: -20,
                background: products[activeProduct].color,
                width: 120, height: 120,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                zIndex: -1,
              }} />
              <div className="float" style={{
                position: "absolute", bottom: 28, right: -24,
                background: "white", padding: "16px 20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)", minWidth: 140
              }}>
                <div style={{ fontSize: 11, color: "#9A8A7A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>As Low As</div>
                <div className="serif" style={{ fontSize: 28, fontWeight: 700 }}>{products[activeProduct].price}</div>
                <div style={{ fontSize: 12, color: "#9A8A7A", marginTop: 2 }}>{products[activeProduct].note}</div>
              </div>
            </div>
          </FadeIn>

          {/* Product details */}
          <FadeIn direction="right" delay={0.15}>
            <div>
              <div className="tag" style={{ marginBottom: 16 }}>{products[activeProduct].tagline}</div>
              <h3 className="serif" style={{ fontSize: 44, fontWeight: 400, marginBottom: 20 }}>{products[activeProduct].name}</h3>
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#C4944A" stroke="none" />)}
                <span style={{ fontSize: 13, color: "#9A8A7A", marginLeft: 8 }}>4.9 (2,841 reviews)</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "#6B4F3A", marginBottom: 32 }}>
                An ultra-concentrated botanical formula that works overnight to restore luminosity, plump, and visibly lift tired skin. Dermatologist tested, microbiome-safe.
              </p>

              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A8A7A", marginBottom: 14 }}>Key Ingredients</div>
                <div>
                  {["Bakuchiol 2%", "Niacinamide", "Rosehip Oil", "Peptide Complex"].map(i => (
                    <span key={i} className="ingredient-pill"><Leaf size={11} />{i}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 14 }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  <ShoppingBag size={15} /> Add to Ritual
                </button>
                <button className="btn-ghost" style={{ padding: "13px 20px" }}>♡</button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TEXTURE GALLERY */}
      <section style={{ padding: "80px", background: "#F0E8DF" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="tag" style={{ marginBottom: 16 }}>The Texture Story</div>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400 }}>
              Crafted to be <em>felt.</em>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "280px 280px", gap: 12 }}>
          <FadeIn delay={0} className="gallery-img-wrap" style={{ gridRow: "span 2" }}>
            <div className="gallery-img-wrap" style={{ height: "100%" }}>
              <img src={IMGS.img2_foam} alt="Silk Foam" className="img-cover" />
              <div className="gallery-label">Silk Foam</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="gallery-img-wrap">
            <div className="gallery-img-wrap" style={{ height: "100%" }}>
              <img src={IMGS.product1} alt="" className="img-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="gallery-img-wrap" style={{ height: "100%" }}>
              <img src={IMGS.img4_cream} alt="Velvet Cream" className="img-cover" />
              <div className="gallery-label">Velvet Cream</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} style={{ gridRow: "span 2" }}>
            <div className="gallery-img-wrap" style={{ height: "100%" }}>
              <img src={IMGS.img5_drops} alt="Serum Drops" className="img-cover" />
              <div className="gallery-label">Serum Drops</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.25} style={{ gridColumn: "span 2" }}>
            <div className="gallery-img-wrap" style={{ height: "100%" }}>
              <img src={IMGS.product2} alt="" className="img-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PHILOSOPHY SPLIT */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 600 }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={IMGS.img3_luxury} alt="Luxury is knowing what to leave out" className="img-cover" style={{ position: "absolute", inset: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(26,16,5,0.35)" }} />
          <div style={{ position: "relative", padding: "80px 60px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div className="serif" style={{ color: "white", fontSize: 48, fontWeight: 400, lineHeight: 1.2, marginBottom: 20 }}>
              "Luxury is<br />knowing what<br />to leave out."
            </div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, letterSpacing: "0.08em" }}>— Founder, LUMÉ</div>
          </div>
        </div>

        <div style={{ background: "#1A1005", padding: "80px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <FadeIn direction="right">
            <div className="tag" style={{ background: "#3D2B1F", color: "#EAD9C8", marginBottom: 28 }}>Our Philosophy</div>
            <h2 className="serif" style={{ fontSize: 38, fontWeight: 400, color: "#FAF6F1", lineHeight: 1.2, marginBottom: 28 }}>
              Less, but<br /><em>luminous.</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#A89880", marginBottom: 40, maxWidth: 380 }}>
              We believe in editing — not adding. Each LUMÉ formula contains only what your skin truly needs: potent actives, rare botanicals, and zero filler. No fragrance. No noise.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
              {[
                ["100%", "Vegan & cruelty-free"],
                ["0", "Synthetic fragrance"],
                ["30+", "Active botanicals"],
                ["72hr", "Hydration proven"],
              ].map(([n, l]) => (
                <div key={l} style={{ borderTop: "1px solid #3D2B1F", paddingTop: 16 }}>
                  <div className="serif" style={{ fontSize: 30, color: "#D4A88A", fontWeight: 700 }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#7A6A5A", marginTop: 4, letterSpacing: "0.06em" }}>{l}</div>
                </div>
              ))}
            </div>
            <button className="btn-ghost" style={{ color: "#FAF6F1", borderColor: "#EAD9C8", alignSelf: "flex-start" }}>
              Our Story <ArrowRight size={14} />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: "110px 80px", background: "#FAF6F1" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="tag" style={{ marginBottom: 16 }}>Community Love</div>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400 }}>
              What they're <em>saying.</em>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { quote: "I've tried every luxury serum on the market. LUMÉ is the only one my skin actually craves. The glow is real.", name: "Sophia M.", role: "Verified Buyer", stars: 5 },
            { quote: "Clean, minimal, and it works. My hyperpigmentation visibly faded in three weeks. Nothing short of miraculous.", name: "Anaïs T.", role: "Skincare Enthusiast", stars: 5 },
            { quote: "The texture of the Velvet Serum is unreal — it melts in. And the smell (there is none!) is what sold me on clean beauty.", name: "Lena K.", role: "Beauty Editor", stars: 5 },
          ].map((r, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="review-card">
                <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#C4944A" stroke="none" />)}
                </div>
                <p className="serif" style={{ fontSize: 17, lineHeight: 1.7, fontStyle: "italic", color: "#3A2820", marginBottom: 24 }}>"{r.quote}"</p>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "#9A8A7A", marginTop: 2 }}>{r.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA / NEWSLETTER */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 400, display: "flex", alignItems: "center" }}>
        <img src={IMGS.model} alt="model" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,16,5,0.85) 50%, rgba(26,16,5,0.2))" }} />
        <div style={{ position: "relative", padding: "80px", maxWidth: 540 }}>
          <FadeIn>
            <div className="tag" style={{ background: "rgba(212,168,138,0.2)", color: "#D4A88A", marginBottom: 24 }}>The Inner Circle</div>
            <h2 className="serif" style={{ fontSize: 42, fontWeight: 400, color: "white", lineHeight: 1.15, marginBottom: 20 }}>
              Begin your<br />ritual today.
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 36 }}>
              Join 40,000+ members. Get early access to new formulas, rituals, and stories from the LUMÉ atelier.
            </p>
            <div style={{ display: "flex", gap: 0 }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                  borderRight: "none", padding: "15px 20px", color: "white", fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif", outline: "none",
                }}
              />
              <button className="btn-primary" style={{ background: "#D4A88A", color: "#1A1005", whiteSpace: "nowrap" }}>
                Join Free <ArrowRight size={14} />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1A1005", color: "#A89880", padding: "60px 80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div className="serif" style={{ fontSize: 28, color: "#FAF6F1", marginBottom: 16 }}>LUMÉ</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, maxWidth: 280 }}>
              A luxury botanical skincare atelier. Formulated with intention, crafted with restraint.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              <Heart size={18} style={{ cursor: "pointer", opacity: 0.6, transition: "opacity 0.2s" }} />
            </div>
          </div>
          {[
            ["Explore", ["The Ritual", "New Arrivals", "Best Sellers", "Gift Sets"]],
            ["About", ["Our Story", "Ingredients", "Sustainability", "Press"]],
            ["Support", ["Contact", "Shipping", "Returns", "FAQ"]],
          ].map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAF6F1", marginBottom: 20 }}>{title}</div>
              {links.map(l => (
                <div key={l} style={{ fontSize: 14, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#D4A88A"}
                  onMouseLeave={e => e.target.style.color = "#A89880"}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #3D2B1F", paddingTop: 28, display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.5 }}>
          <span>© 2025 LUMÉ. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </footer>
    </div>
  );
}
