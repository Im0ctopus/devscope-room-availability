type TAppointments = {
  Subject: string
  Organizer: string
  Start: number
  End: number
  Private: boolean
}

type TRoom = {
  Roomlist: string
  Name: string
  RoomAlias: string
  Email: string
  Appointments: TAppointments[]
  Busy: boolean
}

export const getCurrentAppoitmentStratDate = (room: TRoom) => {
  for (let currentAppoitment of room.Appointments) {
    const startDate = new Date(currentAppoitment.Start)
    if (startDate >= new Date()) return startDate
  }
  return new Date()
}

export const getCurrentAppoitmentEndDate = (room: TRoom) => {
  for (let currentAppoitment of room.Appointments) {
    const endDate = new Date(currentAppoitment.End)
    if (endDate >= new Date()) return endDate
  }
  return new Date()
}

export const getCurrentOrganizer = (room: TRoom) => {
  for (let currentAppoitment of room.Appointments) {
    const startDate = new Date(currentAppoitment.Start)
    if (startDate >= new Date()) return currentAppoitment.Organizer
  }
  return ''
}
