// "Hareketi azalt" tercihi (docs/animasyonlar.md ilke 5). Svelte geçişleri CSS kuralının dışında kalır;
// süreleri bu yardımcıyla sıfırlanır.
export function hareketAzaltildi(): boolean {
	return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function sure(ms: number): number {
	return hareketAzaltildi() ? 0 : ms;
}

/**
 * Görünüme giren panelleri sırayla belirtir. Aynı anda giren öğeler 60 ms aralıkla gelir.
 * Döndürdüğü işlev gözlemciyi bırakır.
 */
export function belirmeyiBaslat(kok: ParentNode): () => void {
	document.documentElement.classList.add('hazir');
	const ogeler = [...kok.querySelectorAll<HTMLElement>('[data-panel], [data-belir]')].filter(
		(o) => !o.classList.contains('belirdi')
	);
	if (hareketAzaltildi() || !('IntersectionObserver' in window)) {
		for (const o of ogeler) o.classList.add('belirdi');
		return () => {};
	}
	const gozlemci = new IntersectionObserver(
		(girdiler) => {
			let sira = 0;
			for (const g of girdiler) {
				if (!g.isIntersecting) continue;
				const o = g.target as HTMLElement;
				o.style.setProperty('--gecikme', `${Math.min(sira, 6) * 60}ms`);
				o.classList.add('belirdi');
				gozlemci.unobserve(o);
				sira++;
			}
		},
		{ rootMargin: '0px 0px -8% 0px' }
	);
	for (const o of ogeler) gozlemci.observe(o);
	return () => gozlemci.disconnect();
}
