import { CancelNotification } from '@application/usecases/cancel-notification'
import { NotificationNotFound } from '@application/usecases/errors/notification-not-found'
import { InMemoryNotificationRepository } from '../repositories/in-memory-notification-repository'
import { makeNotification } from './factories/notification-factory'

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const cancelNotification = new CancelNotification(notificationRepository)
    const notification = makeNotification()
    await notificationRepository.create(notification)
    await cancelNotification.execute({ notificationId: notification.id })
    expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
  })

  it('should not be able to cancel a notification when it does not exists', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const cancelNotification = new CancelNotification(notificationRepository)
    const response = cancelNotification.execute({ notificationId: 'fake-notification-id' })
    expect(response).rejects.toThrow(NotificationNotFound)
  })
})
