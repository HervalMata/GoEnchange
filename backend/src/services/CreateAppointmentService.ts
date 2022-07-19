import Appointment from '../entities/Appointment';
import { startOfHour } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import {getCustomRepository} from "typeorm";

interface IRequest {
  provider: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ provider, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = await appointmentsRepository.create({ provider, date: appointmentDate });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
