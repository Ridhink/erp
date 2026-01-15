export interface Metric {
  id: string
  label: string
  value: number | string
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  format?: 'currency' | 'number' | 'percentage'
}

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}

export interface ChartData {
  data: ChartDataPoint[]
  label: string
  color?: string
}

export interface DashboardStats {
  totalUsers: number
  totalProducts: number
  totalRevenue: number
  activeOrders: number
  metrics: Metric[]
}

export interface RecentActivity {
  id: string
  type: 'user_created' | 'product_updated' | 'order_placed' | 'system'
  message: string
  timestamp: string
  user?: string
}

export interface DashboardData {
  stats: DashboardStats
  revenueChart: ChartData
  salesChart: ChartData
  recentActivities: RecentActivity[]
}
