import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/app/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// export const selectStoreDetail = (state: RootState) => state.storeDetail.storeDetail;

// export const selectIsPremium = (state: RootState): boolean => state.storeDetail.storeDetail?.plan === "PRO";

// export const selectIsBasic = (state: RootState): boolean => state.storeDetail.storeDetail?.plan === "Básico";