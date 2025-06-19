export interface ModalButton {
  label: string;
  type?: 'primary' | 'secondary' | 'danger';
  action: () => void;
}