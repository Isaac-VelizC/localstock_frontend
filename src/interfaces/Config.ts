import type { Option } from "./Types";

export interface Tax {
  id: string;
  name: string;
  rate: number;
  code: string;
  priority: number;
  inclusive: boolean;
  country: string;
  state: string;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  type: 'percentage' | 'fixed';
}

export interface RubroInterface {
    id: number;
    name: string;
}

export interface StoreInterface {
    id?: string;
    name: string;
    code: string;
    logo?: string;
    plan?: string;
    country: string;
    rubro: string;
    rubro_name?: string;
    created_at: Date;
    updated_at: Date;
}

export interface StoreFormInterface {
    name_store: string;
    logo?: string;
    country: Option | null;
    rubro: string;
}

// Preferencias de la Aplicación
export interface AppPreferencesInterface {
  timezone: 'America/La_Paz' | 'America/Lima';
  idioma: 'es' | 'en';
  currency: 'BOB' | 'USD';
  // theme: 'light' | 'dark';
}

// Configuración de Inventario
export interface InventorySettingsInterface {
  alerts_stock: boolean;
  stock_minimo: number;
  auto_update_price_on_purchase: boolean;
  margin_percentage: number;
}

// Notificaciones y Alertas
export interface NotificationSettingsInterface {
  notification_email: boolean;
  tax_enabled: boolean;
}

// Encapsulamos las configuraciones
export interface StructuredStoreSettings {
  general: StoreInterface | null;
  preferences: AppPreferencesInterface | null;
  inventory: InventorySettingsInterface | null;
  notifications: NotificationSettingsInterface | null;
}

export interface GeneralSettingInterface {
  timezone: 'America/La_Paz' | 'America/Lima' | null;
  idioma: 'es' | 'en' | null;
  currency: 'BOB' | 'USD' | null;
  // theme: 'light' | 'dark' | null;
  alerts_stock: boolean;
  stock_minimo: number;
  auto_update_price_on_purchase: boolean;
  margin_percentage: number;
  notification_email: boolean;
  tax_enabled: boolean;
}

// Encapsulamos las configuraciones
export interface StructuredStoreSettingsFormulario {
  store: StoreFormInterface;
  settings: GeneralSettingInterface;
}
