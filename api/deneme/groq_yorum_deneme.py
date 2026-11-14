"""Groq yorum denemesi: 120b düz istem ve 20b hazır olgularla. TEST değerleri, gerçek sonuç değil. n=1, temperature 0.2 (deterministik değil).
Çalıştırma: .venv/bin/python -I api/deneme/groq_yorum_deneme.py .env
"""
import json, re, sys, time, pathlib, requests
env = dict(l.split("=", 1) for l in pathlib.Path(sys.argv[1]).read_text().split() if "=" in l)
H = {"Authorization": f"Bearer {env['GROQ_API_KEY']}"}
P = [{"ad": "P-A", "aydinlanma_yuzde": 81, "dunya_gorunurluk_yuzde": 62, "en_uzun_karanlik_saat": 58, "skor": 74},
     {"ad": "P-B", "aydinlanma_yuzde": 69, "dunya_gorunurluk_yuzde": 77, "en_uzun_karanlik_saat": 91, "skor": 66},
     {"ad": "P-C", "aydinlanma_yuzde": 88, "dunya_gorunurluk_yuzde": 51, "en_uzun_karanlik_saat": 40, "skor": 71}]
KURAL = ("Sen bir Ay görev planlama aracının yorumcususun. Yalnız verilen JSON'daki sayıları kullan; yeni sayı, "
         "yüzde, tarih ya da tahmin üretme. 'Kesin', 'garanti' gibi ifadeler kullanma. Türkçe, en fazla 4 düz cümle.")
def olgular(p):
    o = []
    for alan, yon, ad in [("aydinlanma_yuzde", max, "en yüksek aydınlanma"), ("dunya_gorunurluk_yuzde", max, "en yüksek Dünya görünürlüğü"),
                          ("en_uzun_karanlik_saat", min, "en kısa karanlık"), ("skor", max, "en yüksek skor")]:
        x = yon(p, key=lambda q: q[alan]); o.append(f"{ad}: {x['ad']} ({x[alan]})")
    return o
def kos(model, kullanici):
    t0 = time.time()
    r = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=H, timeout=60, json={
        "model": model, "temperature": 0.2, "messages": [{"role": "system", "content": KURAL}, {"role": "user", "content": kullanici}]})
    r.raise_for_status(); m = r.json()["choices"][0]["message"]["content"]
    izinli = {str(v) for q in P for v in q.values() if isinstance(v, int)}
    yab = [s for s in re.findall(r"\d+(?:[.,]\d+)?", m) if s not in izinli]
    print(f"\n### {model} · {time.time()-t0:.2f} s · veride olmayan sayı: {yab or 'yok'}\n{m}")
duz = "Bu parselleri güç ve iletişim açısından karşılaştır:\n" + json.dumps({"parseller": P}, ensure_ascii=False)
kos("openai/gpt-oss-120b", duz)
hazir = duz + "\n\nHesaplanmış olgular (bunları değiştirme, yalnız cümleye dök):\n" + "\n".join(olgular(P))
kos("openai/gpt-oss-20b", hazir)
