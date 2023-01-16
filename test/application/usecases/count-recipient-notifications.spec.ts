import { CountRecipientNotifications } from '@application/usecases/count-recipient-notifications'
import { InMemoryNotificationRepository } from '../repositories/in-memory-notification-repository'
import { makeNotification } from './factories/notification-factory'

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const countRecipientNotifications = new CountRecipientNotifications(notificationRepository)
    await notificationRepository.create(makeNotification({ recipientId: 'recipient-1'}))
    await notificationRepository.create(makeNotification({ recipientId: 'recipient-1'}))
    await notificationRepository.create(makeNotification({ recipientId: 'recipient-2'}))
    const { count } = await countRecipientNotifications.execute({ recipientId: 'recipient-1' })
    expect(count).toBe(2)
  })
})
