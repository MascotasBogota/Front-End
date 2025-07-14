"use client"

//import { useRouter } from "next/router"
import { reportService } from "../../services/reportService"
import ReportForm from "../../components/Reportes/ReportForm"

const ViewCreateReport = () => {
  //const router = useRouter()

  return (
    <ReportForm
      type="lost"
      onSubmit={async (formData) => {
        try {
          await reportService.createReport(formData)
          alert("Reporte creado con éxito")
          //router.push("/home") 
        } catch (err) {
          alert("Error al crear el reporte")
        }
      }}
      onDiscard={() => router.back()}
    />
  )
}

export default ViewCreateReport

