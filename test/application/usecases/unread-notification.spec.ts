import { UnreadNotification } from '@application/usecases/unread-notification'
import { NotificationNotFound } from '@application/usecases/errors/notification-not-found'
import { InMemoryNotificationRepository } from '../repositories/in-memory-notification-repository'
import { makeNotification } from './factories/notification-factory'

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const unreadNotification = new UnreadNotification(notificationRepository)
    const notification = makeNotification({ readAt: new Date() })
    await notificationRepository.create(notification)
    await unreadNotification.execute({ notificationId: notification.id })
    expect(notificationRepository.notifications[0].readAt).toBeNull()
  })

  it('should not be able to unread a notification when it does not exists', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const unreadNotification = new UnreadNotification(notificationRepository)
    const response = unreadNotification.execute({ notificationId: 'fake-notification-id' })
    expect(response).rejects.toThrow(NotificationNotFound)
  })
})
