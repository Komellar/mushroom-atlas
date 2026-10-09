export const pl = {
  appName: 'Atlas grzybów',
  navigation: {
    atlas: 'Atlas',
    comparison: 'Porównaj',
    details: 'Karta gatunku',
    back: 'Wróć',
    notFound: 'Nie znaleziono strony',
  },
  atlas: {
    eyebrow: 'GRZYBY POLSKICH LASÓW',
    title: 'Twój podręczny atlas',
    description: 'Poznaj cechy gatunków i sprawdź, co odróżnia je od podobnych grzybów.',
    emptyTitle: 'Atlas w przygotowaniu',
    emptyDescription:
      'Poznaj pierwsze gatunki poniżej. Wyszukiwanie i szczegółowe karty są w przygotowaniu.',
    previewAction: 'Zobacz przykładową kartę',
    comparisonAction: 'Otwórz porównywarkę',
    initialSpecies: 'Pierwsze gatunki atlasu',
  },
  safety: {
    title: 'Poznawaj, nie zgaduj',
    guidance:
      'Atlas pomaga poznawać grzyby. Nie potwierdza, że znaleziony okaz można zjeść. W razie wątpliwości skonsultuj go z grzyboznawcą lub klasyfikatorem grzybów.',
    reviewPending: 'Opisy i zdjęcia oczekują na przegląd grzyboznawcy.',
  },
  edibility: { edible: 'Jadalny', inedible: 'Niejadalny', poisonous: 'Trujący' },
  photos: { author: 'Zdjęcie', license: 'Licencja', publicDomain: 'Domena publiczna' },
  comparison: {
    eyebrow: 'DWA GATUNKI, JEDEN WIDOK',
    title: 'Zauważ różnice',
    description: 'Porównaj wygląd, cechy charakterystyczne i miejsca występowania dwóch grzybów.',
    emptyTitle: 'Porównywarka w przygotowaniu',
    emptyDescription: 'Wybór gatunków i zestawienie ich cech pojawią się po uzupełnieniu atlasu.',
    atlasAction: 'Przejdź do atlasu',
  },
  details: {
    eyebrow: 'KARTA GATUNKU',
    title: 'Przykładowa karta',
    description: 'Tak otworzysz szczegółowe informacje o wybranym grzybie.',
    emptyTitle: 'Opis gatunku w przygotowaniu',
    emptyDescription:
      'Tutaj pojawią się zdjęcia, jadalność, najważniejsze cechy i podobne gatunki.',
    comparisonAction: 'Przejdź do porównania',
    atlasAction: 'Wróć do atlasu',
    missingTitle: 'Nie znaleziono gatunku',
    missingDescription: 'Ten gatunek nie jest jeszcze dostępny w atlasie. Wróć do listy grzybów.',
  },
  notFound: {
    title: 'Nie znaleziono strony',
    description: 'Wróć do atlasu, aby kontynuować przeglądanie aplikacji.',
    action: 'Wróć do atlasu',
  },
} as const;
