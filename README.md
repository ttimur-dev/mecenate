# Mecenate

Мобильное приложение на Expo (iOS/Android)

## Реализовано

- список постов: аватар, имя автора, превью/контент, обложка, лайки, комментарии
- фильтрация ленты по типу контента (all/free/paid)
- курсорная пагинация при скролле вниз
- pull-to-refresh
- `tier: "paid"` как закрытая карточка с заглушкой
- запрет перехода в детальный экран для закрытого (`paid`) поста
- skeleton-загрузка карточек
- детальный экран поста с отображением комментариев

## Архитектура (FSD + Expo Router)

- `src/app` — только роутинг/entrypoints Expo Router (`_layout`, route-файлы)
- `src/pages` — экранные композиции (`feed`, `post-detail`)
- `src/features` — пользовательские сценарии (`feed-filter`)
- `src/entities` — доменная модель постов (`post`)
- `src/shared` — общие модули (`api`, `config`, `theme`)

Route-файлы в `src/app` сделаны thin-wrapper и реэкспортят страницы из `src/pages`.

## Стек

- Expo SDK 54
- React Native + Expo Router
- TypeScript
- React Query (`@tanstack/react-query`)
- MobX (`mobx`, `mobx-react-lite`)
- дизайн-токены + Manrope (`@expo-google-fonts/manrope`)

## Установка и запуск

```bash
npm install
npx expo start
```

Запуск:

- Expo Go (iOS/Android)
- iOS Simulator (`i`)
- Android Emulator (`a`)

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
EXPO_PUBLIC_API_BASE_URL=https://k8s.mectest.ru/test-app
EXPO_PUBLIC_API_TOKEN=550e8400-e29b-41d4-a716-446655440000
```

## API

- Лента постов: `GET /posts`
- Детали поста: `GET /posts/:id`
- Комментарии: `GET /posts/:id/comments`
- Авторизация: `Authorization: Bearer <UUID>`
