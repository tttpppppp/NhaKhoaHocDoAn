import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { notification } from 'antd'
import { useEffect } from 'react'
import { NotificationPlacement } from 'antd/es/notification/interface'
import { Helmet } from 'react-helmet-async'
import dashboarApi from '../../apis/dashboard.api'
import { useQuery } from '@tanstack/react-query'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboarApi.getDashboard()
  })

  const [api, contextHolder] = notification.useNotification()

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: 'Chào mừng bạn!',
      description: 'Chào mừng bạn đến với trang quản trị hệ thống. Chúc bạn một ngày làm việc hiệu quả!',
      placement
    })
  }

  useEffect(() => {
    openNotification('topRight')
  }, [])

  const totalUsers = data?.data.data.totalUsers ?? 0
  const totalScients = data?.data.data.totalScients ?? 0
  const totalArticles = data?.data.data.totalArticles ?? 0

  const stats = [
    {
      title: 'Tổng người dùng',
      value: `${totalUsers}`,
      change: '+3.1%',
      changeColor: 'text-green-500',
      gradient: 'from-indigo-500 to-indigo-400'
    },
    {
      title: 'Tổng nhà khoa học',
      value: `${totalScients}`,
      change: '+2.5%',
      changeColor: 'text-green-500',
      gradient: 'from-blue-500 to-blue-400'
    },
    {
      title: 'Tổng bài viết',
      value: `${totalArticles}`,
      change: '+4.2%',
      changeColor: 'text-green-500',
      gradient: 'from-green-500 to-green-400'
    },
    {
      title: 'Pending Issues',
      value: '3',
      change: '-1.2%',
      changeColor: 'text-red-500',
      gradient: 'from-red-500 to-red-400'
    }
  ]

  const chartData = {
    labels: ['Thống kê tổng quan'],
    datasets: [
      {
        label: 'Người dùng',
        data: [totalUsers],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        fill: true
      },
      {
        label: 'Nhà khoa học',
        data: [totalScients],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: true
      },
      {
        label: 'Bài viết',
        data: [totalArticles],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        fill: true
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Thống kê tổng quan hệ thống'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {contextHolder}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`bg-gradient-to-r ${stat.gradient} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300`}>
              <h3 className="text-sm font-medium opacity-90">{stat.title}</h3>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className={`text-sm ${stat.changeColor} mt-1`}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <Line data={chartData} options={chartOptions} />
        </div>
      </main>
    </div>
  )
}
