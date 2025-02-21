export type BaseEmojiPickerProps = {
  children?: React.ReactNode;
  className?: string;
  onEmojiSelect?: (emoji: string) => void;
  emojisPerRow?: number;
  emojiSize?: number;
  maxUnicodeVersion?: number;
};
