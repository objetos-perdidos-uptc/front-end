import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useApiMutation } from '@/shared/api/hooks'
import { toast } from '@/shared/hooks/useToast'
import { createReport } from '../api'
import type { CreateReportInput } from '../schemas'
import type { Report } from '../types'
import { reportKeys } from './useMyReports'

export function useCreateReport() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useApiMutation<Report, CreateReportInput>({
    mutationFn: createReport,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: reportKeys.all })
      toast.success('Reporte creado')
      navigate('/reports')
    },
  })
}
