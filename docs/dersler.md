# Ölçülmüş dersler — LUNARIS

> Yalnız gerçekten yaşanmış ve sebebi ölçülmüş şey ders olur. Biçim: ne oldu · nasıl anlaşıldı · ne değişti.
> Oturum başında yalnız `## ` başlıkları bağlama basılır; başlık dersi tek başına anlatmalı.

_Henüz ders yok._

## npm 10.9.7 SvelteKit iskeletinde `edgesOut` hatasıyla düşüyor, npm 11 kuruyor
Ne oldu: `sv create` sonrası `npm install` iki kez "Cannot read properties of null (reading 'edgesOut')" ile düştü.
Nasıl anlaşıldı: hata yığını `@npmcli/arborist` `#loadPeerSet` içinde (ölçüldü 2026-11-14 · ~/.npm/_logs); aynı
`package.json` `npx npm@11.6.2 install` ile 25 saniyede kuruldu. Ne değişti: CLAUDE.md "Komutlar" npm 11 ile kurar.

## `pkill -f <desen>` komutu kendi kabuğunu da öldürür
Ne oldu: yerel Apache'yi `pkill -f "tests/apache"` ile kapatırken komut satırı aynı deseni taşıdığı için Bash
çağrısı 144 koduyla öldü (ölçüldü 2026-11-14). Ne değişti: arka plan sunucusu `$!` ile alınan PID ya da
`ss -ltnp` ile bulunan port sahibiyle kapatılır.

## Tasarımı "açık" gösteren parlaklık değil, ton ve katman farkıydı
Ne oldu: kullanıcı paleti "aşırı koyu" buldu, SOLARIS'i örnek gösterdi. Nasıl anlaşıldı: ekran görüntüsünden
piksel ölçümü (ölçüldü 2026-11-14 · Chromium canvas · CIELAB L*): SOLARIS zemini L* 5–9, bizimki 3,3; asıl fark
SOLARIS'in renkli zemini ve L* yaklaşık 12'lik kartlarıydı. Ne değişti: katman farkı ölçüt oldu (docs/tasarim.md
§4 ölçüt 10) ve `belirtecler.test.ts` her koşuda ölçüyor.
