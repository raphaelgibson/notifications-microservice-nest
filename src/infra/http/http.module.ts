import { Module } from '@nestjs/common'
import { SendNotification } from '@application/usecases/send-notification'
import { DatabaseModule } from '../database/database.module'
import { NotificationController } from './controllers/notification.controller'
import { CancelNotification } from '@application/usecases/cancel-notification'
import { CountRecipientNotifications } from '@application/usecases/count-recipient-notifications'
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications'
import { ReadNotification } from '@application/usecases/read-notification'
import { UnreadNotification } from '@application/usecases/unread-notification'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    SendNotification,
    ReadNotification,
    UnreadNotification
  ]
})
export class HttpModule {}
