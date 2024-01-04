import { prisma } from '../../../../../prisma';
import { ICard } from '../../../dtos/ICard';
import { ICreateCardDTO } from '../../../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../../dtos/IGetAllCardsDTO';
import { ICardRepository } from '../../../repositories/ICardRepository';

export class CardRepository implements ICardRepository {
  async create({
    description,
    status,
    title,
    user,
  }: ICreateCardDTO): Promise<ICard> {
    return prisma.cards.create({
      data: {
        description,
        status,
        title,
        user: { connect: { id: user.id } },
      },
    });
  }

  async update(card: ICard): Promise<ICard> {
    return prisma.cards.update({
      where: { _id: card.id }, // Use _id for MongoDB
      data: card,
    });
  }

  async findById(id: string): Promise<ICard | null> {
    return prisma.cards.findUnique({ where: { _id: id } });
  }

  async findAll({
    id,
    description,
    status,
    title,
    user_id,
  }: IGetAllCardsDTO): Promise<ICard[]> {
    return prisma.cards.findMany({
      where: {
        user: { id: user_id },
        _id: id ? { equals: id } : undefined,
        description: description
          ? { contains: description.toLowerCase() }
          : undefined,
        status: status ? { equals: status } : undefined,
        title: title ? { contains: title.toLowerCase() } : undefined,
      },
    });
  }

  async delete(card: ICard): Promise<void> {
    await prisma.cards.delete({
      where: { _id: card.id },
    });
  }
}
