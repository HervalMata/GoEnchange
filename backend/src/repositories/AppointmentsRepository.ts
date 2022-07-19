import Appointment from "../entities/Appointment";
import {isEqual} from "date-fns";
import CreateAppointmentDTO from "../dtos/CreateAppointmentDTO";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{
  private appointments: Appointment[];

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

    return findAppointment || null;
  }

  /*public async create({ provider, date }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }*/
}

export default AppointmentsRepository;
