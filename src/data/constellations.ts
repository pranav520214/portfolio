export interface GreetingStar {
  greeting: string;
  language: string;
  code: string;
  pronunciation: string;
  x: number;
  y: number;
}

export interface GreetingConstellation {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  stars: GreetingStar[];
  edges: [number, number][];
}

// Original simplified patterns; language groupings are an artistic welcome.
export const CONSTELLATIONS: GreetingConstellation[] = [
  {
    id: "orion", name: "Orion", subtitle: "A welcome from India", color: "#ff915b",
    stars: [
      { greeting: "नमस्ते", language: "Hindi", code: "hi", pronunciation: "Namaste", x: 25, y: 14 },
      { greeting: "नमस्कार", language: "Marathi", code: "mr", pronunciation: "Namaskar", x: 76, y: 17 },
      { greeting: "નમસ્તે", language: "Gujarati", code: "gu", pronunciation: "Namaste", x: 24, y: 40 },
      { greeting: "வணக்கம்", language: "Tamil", code: "ta", pronunciation: "Vanakkam", x: 50, y: 54 },
      { greeting: "నమస్కారం", language: "Telugu", code: "te", pronunciation: "Namaskaram", x: 78, y: 68 },
      { greeting: "ನಮಸ್ಕಾರ", language: "Kannada", code: "kn", pronunciation: "Namaskara", x: 20, y: 83 },
      { greeting: "নমস্কার", language: "Bengali", code: "bn", pronunciation: "Nomoshkar", x: 76, y: 88 },
    ],
    edges: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [5, 6]],
  },
  {
    id: "cassiopeia", name: "Cassiopeia", subtitle: "Across Europe", color: "#dfd183",
    stars: [
      { greeting: "Hallo", language: "German", code: "de", pronunciation: "Hallo", x: 14, y: 26 },
      { greeting: "Привет", language: "Russian", code: "ru", pronunciation: "Privet", x: 29, y: 78 },
      { greeting: "Bonjour", language: "French", code: "fr", pronunciation: "Bonjour", x: 50, y: 38 },
      { greeting: "Ciao", language: "Italian", code: "it", pronunciation: "Ciao", x: 72, y: 72 },
      { greeting: "Hola", language: "Spanish", code: "es", pronunciation: "Hola", x: 87, y: 16 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    id: "lyra", name: "Lyra", subtitle: "Across East Asia", color: "#a4cdc2",
    stars: [
      { greeting: "こんにちは", language: "Japanese", code: "ja", pronunciation: "Konnichiwa", x: 24, y: 14 },
      { greeting: "안녕하세요", language: "Korean", code: "ko", pronunciation: "Annyeonghaseyo", x: 42, y: 43 },
      { greeting: "你好", language: "Mandarin", code: "zh", pronunciation: "Nǐ hǎo", x: 79, y: 35 },
      { greeting: "Сайн уу", language: "Mongolian", code: "mn", pronunciation: "Sain uu", x: 26, y: 82 },
      { greeting: "你好", language: "Cantonese", code: "yue", pronunciation: "Néih hóu", x: 71, y: 81 },
    ],
    edges: [[0, 1], [1, 2], [2, 4], [4, 3], [3, 1]],
  },
  {
    id: "cygnus", name: "Cygnus", subtitle: "A world of hellos", color: "#b8a9d9",
    stars: [
      { greeting: "مرحبا", language: "Arabic", code: "ar", pronunciation: "Marhaban", x: 55, y: 12 },
      { greeting: "Hello", language: "English", code: "en", pronunciation: "Hello", x: 47, y: 48 },
      { greeting: "Jambo", language: "Swahili", code: "sw", pronunciation: "Jambo", x: 13, y: 35 },
      { greeting: "Olá", language: "Portuguese", code: "pt", pronunciation: "Olá", x: 84, y: 63 },
      { greeting: "Merhaba", language: "Turkish", code: "tr", pronunciation: "Merhaba", x: 37, y: 87 },
    ],
    edges: [[0, 1], [1, 4], [2, 1], [1, 3]],
  },
];
