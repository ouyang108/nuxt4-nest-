export interface UseAudioOptions {
  lang?: string; // 语言，默认为浏览器默认语言
  pitch?: number; // 音调，默认为1，范围为0到2
  volume?: number; // 音量，默认为1，范围为0到1
  rate?: number; // 语速，默认为1，范围为0.1到10
}
export const useAudio = (options: UseAudioOptions) => {
  const { lang = "es-US", pitch = 1, volume = 1, rate = 0.7 } = options;

  const speak = (text: string) => {
    if (typeof SpeechSynthesisUtterance === "undefined") return;
    const pronounce = new SpeechSynthesisUtterance();
    pronounce.lang = lang;
    pronounce.pitch = pitch;
    pronounce.volume = volume;
    pronounce.rate = rate;
    pronounce.text = text;
    window.speechSynthesis.speak(pronounce);
  };

  return {
    speak,
  };
};
