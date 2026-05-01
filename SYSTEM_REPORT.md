# Aonware.ai - Sistem Mimarisi ve Kod İnceleme Raporu

Bu rapor, Aonware.ai Headless API Backend projesinin başlatılan 1.0.0 sürümü için detaylı, satır satır mimari kararlarını ve sistem yapısını analiz etmektedir. Proje, "Principal System Architect" rolüne uygun olarak tamamen sıfır hata, yüksek ölçeklenebilirlik ve güvenlik standartları (Shift-Left Security) gözetilerek inşa edilmiştir.

## 1. Temel Mimari ve Teknoloji Yığını (Tech Stack)

Sistem tamamen modern, ayrıştırılmış (decoupled) bir backend mimarisi olarak kurgulanmıştır:
- **Dil:** Python 3.10+ (Tip güvenliği için `mypy` yapılandırılmıştır).
- **Core Framework:** Django 5.x.
- **API Katmanı:** Hız ve Pydantic entegrasyonu için Django Ninja seçilmiş, merkezi yönlendirme `api_gateway` uygulamasına devredilmiştir.
- **Bağımlılık Yönetimi (Dependency Management):** Geleneksel `requirements.txt` yerine tüm bağımlılıklar ve geliştirme paketleri `pyproject.toml` üzerinden `Poetry` ile yönetilmektedir.
- **Veritabanı & Önbellek:** İlişkisel veriler için PostgreSQL, önbellekleme mekanizmaları için Redis yapılandırılmış, bunlar `docker-compose.yml` ile izole edilmiştir.

## 2. Proje Yapılandırması ve 12-Factor App Standartları

**`docker-compose.yml` İncelemesi:**
- `db` (PostgreSQL 15-alpine) ve `redis` (Redis 7-alpine) servisleri tanımlandı. Her ikisi de veri kaybını önlemek için kalıcı (persistent) volume'lar (`postgres_data`, `redis_data`) kullanacak şekilde ayarlandı.
- Ortam değişkenleri ile `aonware_ai` veritabanı ilk kurulumda ayağa kalkacak şekilde ayarlandı.

**Settings Mimarisi (`aonware_ai/settings/`):**
Geleneksel tekil `settings.py` dosyası yerine, 12-Factor App prensibine uygun yapı kuruldu:
- `base.py`: Tüm ortamlar için ortak olan yapılandırmalar. `django-environ` paketi entegre edildi. Güvenlik anahtarı (`SECRET_KEY`), veritabanı `DATABASE_URL` ve Redis cache `REDIS_URL` değişkenleri tamamen `.env` dosyasından okunmaktadır. Ayrıca `CORS_ALLOWED_ORIGINS` ve temel uygulamalar (apps) buraya dahil edilmiştir. `AUTH_USER_MODEL = 'users.User'` ataması yapıldı.
- `local.py`: Geliştirme ortamına özel, `base.py`'dan miras alan (override) dosya.
- `production.py`: Canlı ortama özel, `DEBUG = False` yapılan ve güvenlik başlıklarının (SSL, CSRF) devreye alındığı dosya.
- `manage.py`, `wsgi.py`, ve `asgi.py` varsayılan olarak `aonware_ai.settings.local` kullanacak şekilde güncellendi.

## 3. Güvenlik, Veri Bütünlüğü ve Modeller

**UUIDv4 ve Temel Modeller (`core/models.py`):**
- Güvenlik ve tahmin edilemezlik (ID enumeration attacks) sağlamak amacıyla ardışık integer ID'ler yerine UUIDv4 kullanıldı.
- `TimeStampedModel`: Sistemdeki tüm tabloların `created_at` ve `updated_at` alanlarına sahip olmasını sağlayan soyut (abstract) Django modeli oluşturuldu.

**Kullanıcı Kimlik ve Güvenlik (`users/models.py`):**
- `django.contrib.auth.models.AbstractUser` sınıfı ile `core.models.TimeStampedModel` birlikte miras alınarak (inherit) özel `User` modeli oluşturuldu. Primary Key, `core` modelinden gelen UUID tabanlı ID'dir.

## 4. Domain-Driven Design (DDD) Uygulamaları

Aşağıdaki uygulamalar "Fat Models, Thin Views, Service Layer" mimarisine uygun yaratılmıştır. İş mantığı view'lardan soyutlanmak üzere her app içinde `services.py` dosyası oluşturuldu:
- **`core`:** Tüm sistemin paylaşacağı yardımcı araçlar, exception tipleri ve `TimeStampedModel`.
- **`users`:** JWT, kimlik doğrulama, kullanıcı yetkilendirmesi.
- **`portfolio`:** Projelerin yönetimi. SEO dostu ve tekrarsız linkler (slug) yaratmak için `autoslug` kütüphanesi kullanıldı ve `Project` modelinde `slug` alanı tanımlandı.
- **`blog`:** Makale yönetimi. `Tag` (Etiket) ve `Article` (Makale) modelleri ile ManyToMany ilişkisi kuruldu. `Article` içerikleri `content_markdown` olarak zengin metin desteğine uygun (Markdown) şekilde tasarlandı.
- **`api_gateway`:** Bütün mikro servis/domain rotalarının birleştiği katman. `urls.py` içerisinde Django Ninja API tanımlamaları yapıldı ve versiyonlamalı (`/api/v1/`) endpoint yapısı kuruldu.

## 5. Optimizasyon & Performans Temelleri

- Önbellekleme için `django-environ` kullanılarak `CACHES` yapısı `base.py` içinde tanımlandı (Redis üzerinden).
- Veritabanı N+1 sorgu problemlerinin önüne geçmek için model ilişkilerinde ForeignKey kullanan veriler için `select_related()` ve ManyToMany ilişkiler için `prefetch_related()` standartları belirlendi. API Pagination zorunlu hale getirileceği mimaride onaylandı.

## 6. Kalite ve Pre-commit Kancaları (Code Quality Hooks)

Kodun sıfır hata (zero-defect) standartlarına uymasını garantilemek amacıyla `.pre-commit-config.yaml` ve `pyproject.toml` ile sıkı denetim mekanizmaları kurulmuştur:
- **`black`:** Kodun PEP-8 standartlarında otomatik olarak formatlanması (Satır limiti: 88).
- **`ruff`:** Yüksek performanslı linting. Tanımlanmayan değişkenler veya gereksiz importlar anında yakalanıp temizlenmektedir.
- **`bandit`:** AST (Abstract Syntax Tree) seviyesinde statik güvenlik açığı tarayıcısı. (Örn: Hardcoded parolalar, zayıf kripto kullanımları).
- **`mypy`:** Statik tip kontrolcüsü (Static Type Checking). Python'un tip anotasyonlarına (`typing`) sıkı sıkıya uyması zorunlu kılındı. Ayrıca Django özel tipleri için `django-stubs` sisteme dahil edildi.

**Sonuç:** Aonware.ai Backend sistemi, kurumsal düzeyde ölçeklenebilirlik, esneklik, sürdürülebilirlik, hız ve maksimum veri güvenliği parametreleriyle yapılandırılmış ve ilk `1.0.0` sürümü yayına (commit) hazır hale getirilmiştir.
