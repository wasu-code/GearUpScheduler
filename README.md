# GearUpScheduler

## Spis treści

1. [Opis](#opis)
2. [Struktura projektu](#struktura-projektu)  
3. [Funkcje](#funkcje)
4. [Wymagania](#wymagania)
5. [Instalacja](#instalacja)
6. [Konfiguracja](#konfiguracja)
7. [Użycie](#użycie)

## Opis

GearUpScheduler to aplikacja umożliwiająca łatwe rezerwowanie wizyt u mechanika. Dzięki niej, klienci mogą sprawdzać dostępność terminów, rezerwować wizyty oraz modyfikować już zaplanowane spotkania.

## Struktura projektu
Projekt został podzielony na dwie główne części:

+ `frontend` - interfejs użytkownika stworzony w React
+ `backend` - serwer stworzony w Node.js z wykorzystaniem Express oraz baza danych MongoDB

## Funkcje

- Rezerwowanie wizyt u mechanika
- Przeglądanie dostępności terminów
- Edycja terminów i ich anulowanie
- Powiadomienia o zbliżających się wizytach
- Historia wszystkich wizyt

## Wymagania

- Node.js (w wersji x.x.x)
- MongoDB (w wersji x.x.x)
- Przeglądarka internetowa z obsługą JavaScript

## Instalacja

1. Sklonuj repozytorium na swój lokalny komputer:

```
git clone https://github.com/wasu-code/GearUpScheduler
```

2. Wejdź do katalogu projektu:

```
cd GearUpScheduler
```

3. Zainstaluj zależności:

a. Wejdź do katalogu `frontend`:

```
cd frontend
```

b. Zainstaluj zależności:

```
npm install
```

### Backend

a. Wejdź do katalogu `backend`:

```
cd backend
```

b. Zainstaluj zależności:

```
npm install
```

## Konfiguracja

Aby skonfigurować aplikację, utwórz plik `.env` na podstawie pliku `.env.example` i uzupełnij odpowiednie zmienne środowiskowe.

Przykładowe pliki konfiguracyjne:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/gearup
```

## Użycie

### Backend

1. Wejdź do katalogu `backend`:

```
cd backend
```

2. Uruchom serwer:

```
npm start
```

### Frontend

1. Wejdź do katalogu `frontend`:

```
cd frontend
```

2. Uruchom aplikację:

```
npm start
```

3. Otwórz przeglądarkę i przejdź do:

```
http://localhost:3000
```

4. Zaloguj się lub zarejestruj jako klient/mechanik.

5. Przeglądaj dostępne terminy i dokonuj rezerwacji.

6. Edytuj lub odwołuj wizyty w panelu klienta/mechanika.
