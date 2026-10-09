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
      'Wkrótce znajdziesz tutaj zdjęcia i opisy popularnych grzybów występujących w Polsce.',
    previewAction: 'Zobacz przykładową kartę',
    comparisonAction: 'Otwórz porównywarkę',
  },
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
