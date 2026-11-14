"""docs/LUNARIS_bilim_parametre_seti.md içindeki sayıların ve formüllerin bağımsız kontrolü.

Çalıştırma: .venv/bin/python hat/kontrol/parametre_seti_kontrol.py
Rastgelelik yok; formül testleri sabit tohumla (SEED) üretilen noktaları kullanır.
Çıkış kodu: uyuşmayan sayı ya da düşen formül testi varsa 1.
"""
import math
import sys

import numpy as np

SEED = 20261114
R_AY_KM = 1737.4
C_KM_S = 299_792.458
SIGMA = 5.670374419e-8
G_AY = 1.62

hatalar: list[str] = []


def sayi(ad: str, hesap: float, belge: float, tol: float) -> None:
    durum = "OK" if abs(hesap - belge) <= tol else "FARK"
    if durum == "FARK":
        hatalar.append(ad)
    print(f"{durum:4}  {ad:58} hesap={hesap:.4g}  belge={belge:g}")


def test(ad: str, gecti: bool, not_: str = "") -> None:
    if not gecti:
        hatalar.append(ad)
    print(f"{'OK' if gecti else 'DÜŞTÜ':4}  {ad:58} {not_}")


def disk_kesri(x: np.ndarray) -> np.ndarray:
    x = np.clip(x, -1, 1)
    return (np.arccos(-x) + x * np.sqrt(1 - x**2)) / np.pi


def enu(phi: float, lam: float):
    u = np.array([math.cos(phi) * math.cos(lam), math.cos(phi) * math.sin(lam), math.sin(phi)])
    e = np.array([-math.sin(lam), math.cos(lam), 0.0])
    n = np.array([-math.sin(phi) * math.cos(lam), -math.sin(phi) * math.sin(lam), math.cos(phi)])
    return u, e, n


def bolum_1_sayilar() -> None:
    print("\n== Bölüm 1 ve modüllerdeki sayılar ==")
    sayi("Gölge katsayısı 1/tan 1,54°", 1 / math.tan(math.radians(1.54)), 37.2, 0.05)
    sayi("Panel hücre tavanı 36 × 1365 × 0,32 [kW]", 36 * 1365 * 0.32 / 1000, 15.72, 0.01)
    sayi("Sistem kaybı η_sis = 10 / 15,72", 10 / 15.7248, 0.64, 0.005)
    r1, r2 = math.sqrt(2 * R_AY_KM * 0.004), math.sqrt(2 * R_AY_KM * 0.0015)
    sayi("Radyo ufku 4 m direk [km]", r1, 3.73, 0.005)
    sayi("Radyo ufku 1,5 m alıcı [km]", r2, 2.28, 0.005)
    sayi("Regolit kalkan basıncı 4 m [kPa]", 4 * 1900 * G_AY / 1000, 12.3, 0.05)
    sayi("Ay saati konum kayması c × 56,02 µs [km/gün]", C_KM_S * 56.02e-6, 16.8, 0.05)
    for lat, belge in [(89.45, 2.09), (88, 3.54), (85, 6.54)]:
        sayi(f"Maks. güneş yüksekliği {lat}°G [°]", (90 - lat) + 1.54, belge, 0.005)
    for d, belge in [(10, 0.16), (50, 0.82), (150, 2.47)]:
        sayi(f"Eğrilik düşüşü d/(2R), d = {d} km [°]", math.degrees(d / (2 * R_AY_KM)), belge, 0.01)
    for a, belge in [(1.54, 156), (3, 185), (6.5, 224)]:
        t = ((1 - 0.12) * 1365 * math.sin(math.radians(a)) / (0.95 * SIGMA)) ** 0.25
        sayi(f"Termal denge α = {a}° [K]", t, belge, 1.0)
    for saat, belge in [(68, 89), (73, 96), (117, 154)]:
        sayi(f"Batarya 1 kW × {saat} sa / (0,8 × 0,95) [kWh]", saat / (0.8 * 0.95), belge, 0.6)
    sayi("Batarya kütlesi 96 kWh / 200 Wh/kg [kg]", 96.05 / 0.2, 480, 1)
    sayi("Batarya kütlesi 154 kWh / 150 Wh/kg [kg]", 153.9 / 0.15, 1030, 5)
    lam_x, lam_s = C_KM_S * 1e3 / 8.4e9, C_KM_S * 1e3 / 2.2e9
    sayi("X-bant serbest uzay kaybı 384.400 km [dB]", 20 * math.log10(4 * math.pi * 3.844e8 / lam_x), 222.6, 0.05)
    sayi("S-bant serbest uzay kaybı 384.400 km [dB]", 20 * math.log10(4 * math.pi * 3.844e8 / lam_s), 211.0, 0.05)
    sayi("Kaybın apoje farkı 406.700 km [dB]", 20 * math.log10(406_700 / 384_400), 0.6, 0.15)
    sayi("Kaybın perije farkı 356.500 km [dB]", 20 * math.log10(384_400 / 356_500), 0.6, 0.15)
    sayi("Kutup kapağı alanı 83°G → 90°G [bin km²]",
         2 * math.pi * R_AY_KM**2 * (1 - math.sin(math.radians(83))) / 1000, 141, 1)
    sayi("Güneş azimut hızı 360 / (29,53 × 24) [°/sa]", 360 / (29.53 * 24), 0.508, 0.001)
    sayi("14 gün ileri sarmada ΔA [°]", 360 * 14 / 29.53, 171, 0.5)
    sayi("Güneş açısal yarıçapı 1 AU [°]", math.degrees(math.atan(695_700 / 149_597_870.7)), 0.267, 0.001)
    sayi("Dünya açısal yarıçapı 384.400 km [°]", math.degrees(math.atan(6371 / 384_400)), 0.95, 0.005)
    sayi("Işık gecikmesi tek yön [s]", 384_400 / C_KM_S, 1.28, 0.005)
    sayi("ET − UTC = 37 + 32,184 [s]", 37 + 32.184, 69.2, 0.05)
    sayi("Ölçek hatası k = 2/(1 − sin φ), 83°G [%]", (2 / (1 - math.sin(math.radians(-83))) - 1) * 100, 0.37, 0.01)
    sayi("Işın adımı d·tan 0,05°, 10 km [m]", 10_000 * math.tan(math.radians(0.05)), 8.7, 0.05)
    sayi("Işın adımı d·tan 0,05°, 100 km [m]", 100_000 * math.tan(math.radians(0.05)), 87, 0.5)
    tan_e = math.tan(math.radians(0.05))
    d1 = 5 / tan_e  # 5 m piksel adımının yerini oransal adımın aldığı uzaklık
    ornek = d1 / 5 + math.log(150_000 / d1) / tan_e
    sayi("Işın başına örnek sayısı (5 m piksel, 150 km)", ornek, 5000, 250)
    sayi("Nokta başına örnek (720 ışın) [milyon]", ornek * 720 / 1e6, 3.5, 0.2)
    sayi("Balistik menzil 300 m/s, γ = 1° [km]", 300**2 * math.sin(math.radians(2)) / G_AY / 1000, 1.9, 0.05)
    sayi("Balistik menzil 300 m/s, γ = 3° [km]", 300**2 * math.sin(math.radians(6)) / G_AY / 1000, 5.8, 0.05)
    gm = 4902.8
    sayi("Ay yörünge hızı √(GM/R) [km/s]", math.sqrt(gm / R_AY_KM), 1.68, 0.005)
    sayi("Ay kaçış hızı √(2GM/R) [km/s]", math.sqrt(2 * gm / R_AY_KM), 2.38, 0.005)
    sayi("PSR yürüyüşü 2 × 1,3 × 2 km / 2 km/sa [sa]", 2 * 1.3 * 2 / 2, 2.6, 0.001)
    sayi("2 saate sığan mesafe 2 / (2 × 1,3 / 2) [km]", 2 / (2 * 1.3 / 2), 1.5, 0.05)
    sayi("Libration tepe-tepe enlem 2 × 6,68 [°]", 2 * 6.68, 13.4, 0.05)
    sayi("Modül 7 ağırlık toplamı", 0.30 + 0.25 + 0.15 + 0.15 + 0.15, 1.0, 1e-9)
    sayi("TSI farkı (1365 − 1361)/1361 [%]", (1365 - 1361) / 1361 * 100, 0.3, 0.02)
    sayi("Bölüm 10 tablosundaki saha toplamı (9 bölge)", 5 + 10 + 11 + 9 + 9 + 11 + 7 + 11 + 5, 130, 0)


def bolum_2_formuller() -> None:
    print("\n== Formül testleri ==")
    rng = np.random.default_rng(SEED)

    x = np.array([-1.0, 0.0, 1.0])
    test("0.4 disk kesri: f(−1)=0, f(0)=0,5, f(1)=1", np.allclose(disk_kesri(x), [0, 0.5, 1]))
    xs = np.linspace(-1, 1, 201)
    test("0.4 disk kesri tekdüze artıyor", bool(np.all(np.diff(disk_kesri(xs)) >= 0)))
    # Sayısal alan: birim çemberde y > −x kısmının alan oranı
    yy = np.linspace(-1, 1, 4001)
    serit = 2 * np.sqrt(np.clip(1 - yy**2, 0, None))
    x0 = 0.3
    alan = np.trapezoid(serit * (yy > -x0), yy) / math.pi
    test("0.4 disk kesri sayısal alanla aynı (x = 0,3)", abs(alan - disk_kesri(np.array([x0]))[0]) < 1e-3,
         f"sayısal={alan:.4f}")

    ok = True
    for _ in range(200):
        phi, lam = math.radians(rng.uniform(-89.9, -80)), math.radians(rng.uniform(-180, 180))
        u, e, n = enu(phi, lam)
        m = np.vstack([u, e, n])
        ok &= np.allclose(m @ m.T, np.eye(3), atol=1e-12) and np.allclose(np.cross(e, n), u, atol=1e-12)
    test("S.2 ENU eksenleri birim, dik ve sağ elli (doğu × kuzey = yukarı)", bool(ok))

    farklar = []
    for _ in range(500):
        phi, lam = math.radians(rng.uniform(-89.5, -80)), math.radians(rng.uniform(-180, 180))
        beta, lam_s = math.radians(rng.uniform(-1.6, 1.6)), math.radians(rng.uniform(-180, 180))
        u, e, n = enu(phi, lam)
        s = np.array([math.cos(beta) * math.cos(lam_s), math.cos(beta) * math.sin(lam_s), math.sin(beta)])
        e_vek, a_vek = math.asin(s @ u), math.atan2(s @ e, s @ n)
        e_an = math.asin(math.sin(beta) * math.sin(phi) + math.cos(beta) * math.cos(phi) * math.cos(lam - lam_s))
        a_an = math.atan2(math.sin(lam_s - lam) * math.cos(beta),
                          math.cos(phi) * math.sin(beta) - math.sin(phi) * math.cos(beta) * math.cos(lam_s - lam))
        da = (a_vek - a_an + math.pi) % (2 * math.pi) - math.pi
        farklar.append(max(abs(e_vek - e_an), abs(da)))
    test("0.2 alt-nokta formülü, sonsuz uzaklıkta 0.1 vektör yöntemiyle aynı", max(farklar) < 1e-9,
         f"maks fark={max(farklar):.1e} rad (atan2 ile)")

    ok = True
    for _ in range(500):
        phi, lam = math.radians(rng.uniform(-90, -60)), math.radians(rng.uniform(-180, 180))
        rho = 2 * R_AY_KM * math.tan(math.pi / 4 + phi / 2)
        xk, yk = rho * math.sin(lam), rho * math.cos(lam)
        phi2 = 2 * math.atan(math.hypot(xk, yk) / (2 * R_AY_KM)) - math.pi / 2
        lam2 = math.atan2(xk, yk)
        ok &= abs(phi2 - phi) < 1e-12 and abs((lam2 - lam + math.pi) % (2 * math.pi) - math.pi) < 1e-12
    test("S.1 stereografik ileri ve ters dönüşüm birbirini tutuyor", bool(ok))
    try:
        import pyproj
        crs = pyproj.CRS.from_proj4(f"+proj=stere +lat_0=-90 +lon_0=0 +k=1 +R={R_AY_KM * 1000} +units=m")
        tr = pyproj.Transformer.from_crs(pyproj.CRS.from_proj4(f"+proj=longlat +R={R_AY_KM * 1000}"), crs,
                                         always_xy=True)
        lam_d, phi_d = 37.24, -85.19
        px, py = tr.transform(lam_d, phi_d)
        rho = 2 * R_AY_KM * 1000 * math.tan(math.pi / 4 + math.radians(phi_d) / 2)
        bx, by = rho * math.sin(math.radians(lam_d)), rho * math.cos(math.radians(lam_d))
        test("S.1 PROJ'un kutup stereografiğiyle karşılaştırma (NR1 merkezi)",
             abs(abs(px) - abs(bx)) < 1e-3 and abs(abs(py) - abs(by)) < 1e-3,
             f"belge=({bx:.0f}, {by:.0f}) m, PROJ=({px:.0f}, {py:.0f}) m")
    except ImportError:
        test("S.1 PROJ karşılaştırması", False, "pyproj yok")

    # 0.3 eğrilik terimi: küre üstündeki noktanın yerel yataydan düşüş açısı tam olarak θ/2 = d/(2R)
    d = 150.0
    teta = d / R_AY_KM
    tam = math.degrees(math.atan2(R_AY_KM - R_AY_KM * math.cos(teta), R_AY_KM * math.sin(teta)))
    test("0.3 eğrilik terimi d/(2R) küre geometrisiyle aynı (150 km)", abs(tam - math.degrees(d / (2 * R_AY_KM))) < 0.02,
         f"tam={tam:.4f}°")

    # 0.1 paralaks: Dünya'nın Ay merkezinden ve yüzeyden görünen yönü arasındaki en büyük açı
    for d_km in (356_500, 384_400, 406_700):
        print(f"bilgi Dünya paralaksı Ay yüzeyinden, {d_km} km: {math.degrees(math.asin(R_AY_KM / d_km)):.3f}°"
              f"  (belge 0.1: '~1°')")
    print(f"bilgi Ay'ın Dünya yüzeyinden yatay paralaksı, 384.400 km: "
          f"{math.degrees(math.asin(6378.137 / 384_400)):.3f}°")


def main() -> int:
    bolum_1_sayilar()
    bolum_2_formuller()
    print(f"\nToplam uyuşmayan/düşen: {len(hatalar)}")
    for h in hatalar:
        print(f"  - {h}")
    return 1 if hatalar else 0


if __name__ == "__main__":
    sys.exit(main())
