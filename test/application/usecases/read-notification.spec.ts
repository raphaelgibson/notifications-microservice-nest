import { ReadNotification } from '@application/usecases/read-notification'
import { NotificationNotFound } from '@application/usecases/errors/notification-not-found'
import { InMemoryNotificationRepository } from '../repositories/in-memory-notification-repository'
import { makeNotification } from './factories/notification-factory'

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const readNotification = new ReadNotification(notificationRepository)
    const notification = makeNotification()
    await notificationRepository.create(notification)
    await readNotification.execute({ notificationId: notification.id })
    expect(notificationRepository.notifications[0].readAt).toEqual(expect.any(Date))
  })

  it('should not be able to read a notification when it does not exists', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const readNotification = new ReadNotification(notificationRepository)
    const response = readNotification.execute({ notificationId: 'fake-notification-id' })
    expect(response).rejects.toThrow(NotificationNotFound)
  })
})
