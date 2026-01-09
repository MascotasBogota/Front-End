"use client"

import { useState, useEffect, useContext } from "react"
import { reportService } from "../../services/reportService"
import styles from "../../styles/HomeLoggedIn.module.css"
import FilterControls from "../../components/Home/FilterControls"
import ReportButtons from "../../components/Home/ReportButtons"
import ReportGrid from "../../components/Home/ReportGrid"
import { AuthContext } from "../../contexts/AuthContext"

const ViewHomeLogin = () => {
  const { user } = useContext(AuthContext);


  const [reportes, setReportes] = useState([])
  const [filteredReportes, setFilteredReportes] = useState([])
  const [loading, setLoading] = useState(true)
  const [radiusFilter, setRadiusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [userLocation, setUserLocation] = useState(null)
  const [showMyReportsOnly, setShowMyReportsOnly] = useState(false) // Nuevo estado para el filtro "Mis Reportes"

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12 // Increased number of reports per page

  // Fetch reports on component mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reportService.getAllReports()
        console.log("Reportes recibidos:", response)
        const reportesArray = Array.isArray(response) ? response : []
        setReportes(reportesArray)
        setFilteredReportes(reportesArray) // Initialize filtered reports
      } catch (error) {
        console.error("Error al obtener reportes:", error)
        setReportes([])
        setFilteredReportes([])
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Error obteniendo ubicación:", error)
          // Default location (Bogotá)
          setUserLocation({ lat: 4.6097, lng: -74.0817 })
        },
      )
    } else {
      // Default location (Bogotá)
      setUserLocation({ lat: 4.6097, lng: -74.0817 })
    }
  }, [])

  // Function to calculate distance between two points (in km)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371 // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLng = (lng2 - lng1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Apply filters
  useEffect(() => {
    let filtered = [...reportes]

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((reporte) => reporte.type?.toLowerCase() === typeFilter.toLowerCase())
    }

    // Filter by radius
    if (radiusFilter !== "all" && userLocation) {
      const maxDistance = Number.parseInt(radiusFilter)
      filtered = filtered.filter((reporte) => {
        if (!reporte.location?.coordinates) return false
        const [lng, lat] = reporte.location.coordinates
        const distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng)
        return distance <= maxDistance
      })
    }

    // Filter by "Mis Reportes"
    const currentUserId = user?._id || user?.userId;
    if (showMyReportsOnly && currentUserId) {
      filtered = filtered.filter((reporte) => {
        const reportUserId = typeof reporte.user_id === "object" && "$oid" in reporte.user_id
          ? reporte.user_id.$oid
          : reporte.user_id;

        return reportUserId === currentUserId;
      });
    }





    




    setFilteredReportes(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [reportes, typeFilter, radiusFilter, userLocation, showMyReportsOnly, user]) 

  // Pagination logic
  const totalPages = Math.ceil(filteredReportes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedReports = filteredReportes.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={styles.homeContainer}>
      {loading ? (
        <div className={styles.loadingContainer}>Cargando reportes...</div>
      ) : (
        <>
          <div className={styles.topControls}>
            <FilterControls
              radiusFilter={radiusFilter}
              setRadiusFilter={setRadiusFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              totalResults={filteredReportes.length}
            />
            <ReportButtons
              showMyReportsOnly={showMyReportsOnly}
              toggleMyReports={() => setShowMyReportsOnly((prev) => !prev)}
            />
          </div>

          <ReportGrid
            reports={paginatedReports}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}

export default ViewHomeLogin

