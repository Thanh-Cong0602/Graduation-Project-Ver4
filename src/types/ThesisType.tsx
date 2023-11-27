import AdvisorType from './AdvisorType'
import StudentType from './StudentType'
import ThesisTaskType from './ThesisTaskType'
interface ThesisType {
  uuid?: string
  title_vi: string
  title_en: string
  approval_status: number
  thesis_type: number
  semester: string
  program: Record<string, number>[]
  user_role_owner: number
  thesis_info: string
  thesis_task: ThesisTaskType[]
  students: StudentType[]
  advisors: AdvisorType[]
  missions: Array<string>
}

export default ThesisType
