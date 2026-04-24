# Mecenate

Мобильное приложение на Expo (iOS/Android)

## Preview

<table>
  <tr>
    <td align="center"><strong>iOS</strong></td>
    <td align="center"><strong>Android</strong></td>
  </tr>
  <tr>
    <td><img src="assets/mecenate-ios-preview.gif" width="260" alt="iOS preview" /></td>
    <td><img src="assets/mecenate-android-preview.gif" width="260" alt="Android preview" /></td>
  </tr>
</table>

## Реализовано

- список постов: аватар, имя автора, превью/контент, обложка, лайки, комментарии
- фильтрация ленты по типу контента (all/free/paid)
- курсорная пагинация при скролле вниз
- pull-to-refresh
- `tier: "paid"` как закрытая карточка с заглушкой
- запрет перехода в детальный экран для закрытого (`paid`) поста
- skeleton-загрузка карточек
- карточки ошибки ленты с кнопкой повтора
- детальный экран поста с полным текстом, обложкой и автором
- лайк поста из ленты и детального экрана
- анимированный счетчик лайков на Reanimated
- haptic feedback при лайке
- lazy load комментариев через cursor pagination
- поле ввода и отправка нового комментария
- real-time обновления лайков и комментариев через WebSocket

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
- Reanimated (`react-native-reanimated`)
- Haptics (`expo-haptics`)
- Keyboard handling (`react-native-keyboard-controller`)
- дизайн-токены + Manrope (`@expo-google-fonts/manrope`)

## Установка и запуск

```bash
npm install
npx expo start
or
npx expo start --tunnel
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
- Лайк поста: `POST /posts/:id/like`
- Комментарии: `GET /posts/:id/comments`
- Создание комментария: `POST /posts/:id/comments`
- Real-time: `WS /ws?token=<UUID>`
- Авторизация: `Authorization: Bearer <UUID>`

WebSocket подключается глобально при запуске приложения. События `like_updated` и
`comment_added` обновляют React Query cache, поэтому актуальные счетчики видны без
перезагрузки экранов.
