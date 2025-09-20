import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 앱의 전역 상태 타입 정의
interface AppState {
  // 사용자 정보
  user: {
    id: string | null
    nickname: string | null
    email: string | null
    isLoggedIn: boolean
    subscription: 'free' | 'premium' | 'pro'
    avatar?: string
  }
  
  // UI 상태
  ui: {
    isLoading: boolean
    theme: 'light' | 'dark' | 'system'
    sidebarOpen: boolean
    bottomNavActive: 'dashboard' | 'ai-recommendations' | 'stocks' | 'relationship' | 'profile'
    currentPage: string
  }
  
  // 네트워크 상태
  network: {
    isOnline: boolean
    lastSyncTime: Date | null
  }
  
  // 스톡 관련 상태
  stocks: {
    selectedCategory: 'theme' | 'industry'
    sortBy: 'volume' | 'amount' | 'marketCap' | 'changeRate'
    searchQuery: string
    favorites: string[]
  }
}

// 액션 타입 정의
interface AppActions {
  // 사용자 관련 액션
  setUser: (user: Partial<AppState['user']>) => void
  updateUserInfo: (info: { nickname?: string; email?: string; avatar?: string }) => void
  logout: () => void
  
  // UI 관련 액션
  setLoading: (loading: boolean) => void
  setTheme: (theme: AppState['ui']['theme']) => void
  toggleSidebar: () => void
  setBottomNavActive: (active: AppState['ui']['bottomNavActive']) => void
  setCurrentPage: (page: string) => void
  
  // 네트워크 관련 액션
  setOnlineStatus: (isOnline: boolean) => void
  setLastSyncTime: (time: Date) => void
  
  // 스톡 관련 액션
  setStockCategory: (category: AppState['stocks']['selectedCategory']) => void
  setStockSortBy: (sortBy: AppState['stocks']['sortBy']) => void
  setStockSearchQuery: (query: string) => void
  toggleFavorite: (stockId: string) => void
  
  // 전체 상태 리셋
  resetApp: () => void
}

// 초기 상태
const initialState: AppState = {
  user: {
    id: null,
    nickname: null,
    email: null,
    isLoggedIn: false,
    subscription: 'free',
    avatar: undefined,
  },
  ui: {
    isLoading: false,
    theme: 'system',
    sidebarOpen: false,
    bottomNavActive: 'dashboard',
    currentPage: 'dashboard',
  },
  network: {
    isOnline: true,
    lastSyncTime: null,
  },
  stocks: {
    selectedCategory: 'theme',
    sortBy: 'volume',
    searchQuery: '',
    favorites: [],
  },
}

// Zustand 스토어 생성
export const useAppStore = create<AppState & AppActions>()(
  devtools(
    persist(
        (set) => ({
        ...initialState,
        
        // 사용자 관련 액션
        setUser: (user) =>
          set(
            (state) => ({
              user: { ...state.user, ...user, isLoggedIn: true },
            }),
            false,
            'setUser'
          ),
        
            updateUserInfo: (info) =>
              set(
                (prevState) => ({
                  user: { ...prevState.user, ...info },
                }),
                false,
                'updateUserInfo'
              ),
        
        logout: () =>
          set(
            (state) => ({
              user: { ...initialState.user },
            }),
            false,
            'logout'
          ),
        
        // UI 관련 액션
        setLoading: (loading) =>
          set(
            (state) => ({
              ui: { ...state.ui, isLoading: loading },
            }),
            false,
            'setLoading'
          ),
        
        setTheme: (theme) =>
          set(
            (state) => ({
              ui: { ...state.ui, theme },
            }),
            false,
            'setTheme'
          ),
        
        toggleSidebar: () =>
          set(
            (state) => ({
              ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
            }),
            false,
            'toggleSidebar'
          ),
        
        setBottomNavActive: (active) =>
          set(
            (state) => ({
              ui: { ...state.ui, bottomNavActive: active },
            }),
            false,
            'setBottomNavActive'
          ),
        
        setCurrentPage: (page) =>
          set(
            (state) => ({
              ui: { ...state.ui, currentPage: page },
            }),
            false,
            'setCurrentPage'
          ),
        
        // 네트워크 관련 액션
        setOnlineStatus: (isOnline) =>
          set(
            (state) => ({
              network: { ...state.network, isOnline },
            }),
            false,
            'setOnlineStatus'
          ),
        
        setLastSyncTime: (time) =>
          set(
            (state) => ({
              network: { ...state.network, lastSyncTime: time },
            }),
            false,
            'setLastSyncTime'
          ),
        
        // 스톡 관련 액션
        setStockCategory: (category) =>
          set(
            (state) => ({
              stocks: { ...state.stocks, selectedCategory: category },
            }),
            false,
            'setStockCategory'
          ),
        
        setStockSortBy: (sortBy) =>
          set(
            (state) => ({
              stocks: { ...state.stocks, sortBy },
            }),
            false,
            'setStockSortBy'
          ),
        
        setStockSearchQuery: (query) =>
          set(
            (state) => ({
              stocks: { ...state.stocks, searchQuery: query },
            }),
            false,
            'setStockSearchQuery'
          ),
        
        toggleFavorite: (stockId) =>
          set(
            (state) => ({
              stocks: {
                ...state.stocks,
                favorites: state.stocks.favorites.includes(stockId)
                  ? state.stocks.favorites.filter(id => id !== stockId)
                  : [...state.stocks.favorites, stockId]
              },
            }),
            false,
            'toggleFavorite'
          ),
        
        // 전체 상태 리셋
        resetApp: () =>
          set(initialState, false, 'resetApp'),
      }),
      {
        name: 'm-stocklink-storage', // 로컬 스토리지 키
        partialize: (state) => ({
          user: state.user,
          ui: {
            theme: state.ui.theme,
            bottomNavActive: state.ui.bottomNavActive,
          },
          stocks: {
            selectedCategory: state.stocks.selectedCategory,
            sortBy: state.stocks.sortBy,
            favorites: state.stocks.favorites,
          },
        }), // persist할 상태만 선택
      }
    ),
    {
      name: 'm-stocklink-store', // Redux DevTools에서 보이는 이름
    }
  )
)

// 선택자 훅들 (성능 최적화)
export const useUser = () => useAppStore((state) => state.user)
export const useUI = () => useAppStore((state) => state.ui)
export const useNetwork = () => useAppStore((state) => state.network)
export const useStocks = () => useAppStore((state) => state.stocks)

// 액션 훅들
export const useAppActions = () => useAppStore((state) => ({
  setUser: state.setUser,
  updateUserInfo: state.updateUserInfo,
  logout: state.logout,
  setLoading: state.setLoading,
  setTheme: state.setTheme,
  toggleSidebar: state.toggleSidebar,
  setBottomNavActive: state.setBottomNavActive,
  setCurrentPage: state.setCurrentPage,
  setOnlineStatus: state.setOnlineStatus,
  setLastSyncTime: state.setLastSyncTime,
  setStockCategory: state.setStockCategory,
  setStockSortBy: state.setStockSortBy,
  setStockSearchQuery: state.setStockSearchQuery,
  toggleFavorite: state.toggleFavorite,
  resetApp: state.resetApp,
}))
