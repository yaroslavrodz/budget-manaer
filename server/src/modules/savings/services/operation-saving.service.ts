import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { Operation } from '@operations/operation.model';
import { Saving } from '@savings/saving.model';
import { OperationType } from '@core/enums/operation-type.enum';

@Injectable()
export class OperationSavingService {
  constructor(@InjectModel(Saving) private savingRepository: typeof Saving) {}

  async onOperationCreate(operation: Operation, transaction: Transaction) {
    const saving = await this.savingRepository.findOne({
      where: { id: operation.savingId },
    });
    if (operation.type === OperationType.INCOMING) {
      await saving.update(
        { amount: saving.amount + operation.amount },
        { transaction },
      );
    } else {
      await saving.update(
        { amount: saving.amount - operation.amount },
        { transaction },
      );
    }
  }

  async onOperationUpdate(
    operationBefore: Operation,
    operationAfter: Operation,
    transaction: Transaction,
  ) {
    if (
      operationBefore.type === OperationType.INCOMING &&
      operationAfter.type === OperationType.INCOMING
    ) {
      await this.incomingToIncoming(
        operationBefore,
        operationAfter,
        transaction,
      );
    } else if (
      operationBefore.type === OperationType.INCOMING &&
      operationAfter.type === OperationType.SPEND
    ) {
      await this.incomingToSpend(operationBefore, operationAfter, transaction);
    } else if (
      operationBefore.type === OperationType.SPEND &&
      operationAfter.type === OperationType.INCOMING
    ) {
      await this.spendToIncoming(operationBefore, operationAfter, transaction);
    } else {
      await this.spendToSpend(operationBefore, operationAfter, transaction);
    }
  }

  async onOperationDelete(operation: Operation, transaction: Transaction) {
    const saving = await this.savingRepository.findOne({
      where: { id: operation.savingId },
    });
    if (operation.type === OperationType.INCOMING) {
      await saving.update(
        { amount: saving.amount - operation.amount },
        { transaction },
      );
    } else {
      await saving.update(
        { amount: saving.amount + operation.amount },
        { transaction },
      );
    }
  }

  //All methods below only used in 'onOperationUpdate' method
  private async incomingToIncoming(
    operationBefore: Operation,
    operationAfter: Operation,
    transaction: Transaction,
  ) {
    if (operationBefore.savingId === operationAfter.savingId) {
      const saving = await this.savingRepository.findOne({
        where: { id: operationBefore.savingId },
      });
      await saving.update(
        {
          amount:
            saving.amount - operationBefore.amount + operationAfter.amount,
        },
        { transaction },
      );
    } else {
      const savingBefore = await this.savingRepository.findOne({
        where: { id: operationBefore.savingId },
      });
      await savingBefore.update(
        { amount: savingBefore.amount - operationBefore.amount },
        { transaction },
      );
      const savingAfter = await this.savingRepository.findOne({
        where: { id: operationAfter.savingId },
      });
      await savingAfter.update(
        { amount: savingAfter.amount + operationAfter.amount },
        { transaction },
      );
    }
  }

  private async incomingToSpend(
    operationBefore: Operation,
    operationAfter: Operation,
    transaction: Transaction,
  ) {
    if (operationBefore.savingId === operationAfter.savingId) {
      const saving = await this.savingRepository.findOne({
        where: { id: operationBefore.savingId },
      });
      await saving.update(
        {
          amount:
            saving.amount - operationBefore.amount - operationAfter.amount,
        },
        { transaction },
      );
    } else {
      const savingBefore = await this.savingRepository.findOne({
        where: { id: operationBefore.savingId },
      });
      const savingAfter = await this.savingRepository.findOne({
        where: { id: operationAfter.savingId },
      });
      await savingBefore.update(
        { amount: savingBefore.amount - operationBefore.amount },
        { transaction },
      );
      await savingAfter.update(
        { amount: savingAfter.amount - operationAfter.amount },
        { transaction },
      );
    }
  }

  private async spendToIncoming(
    operationBefore: Operation,
    operationAfter: Operation,
    transaction: Transaction,
  ) {
    if (operationBefore.savingId === operationAfter.savingId) {
      const saving = await this.savingRepository.findOne({
        where: { id: operationBefore.savingId },
      });
      await saving.update(
        {
          amount:
            saving.amount + operationBefore.amount + operationAfter.amount,
        },
        { transaction },
      );
    } else {
      const savingBefore = await this.savingRepository.findOne({
        where: { id: operationBefore.savingId },
      });
      const savingAfter = await this.savingRepository.findOne({
        where: { id: operationAfter.savingId },
      });
      await savingBefore.update(
        { amount: savingBefore.amount + operationBefore.amount },
        { transaction },
      );
      await savingAfter.update(
        { amount: savingAfter.amount + operationAfter.amount },
        { transaction },
      );
    }
  }

  private async spendToSpend(
    operationBefore: Operation,
    operationAfter: Operation,
    transaction: Transaction,
  ) {
    if (operationBefore.savingId === operationAfter.savingId) {
      const saving = await this.savingRepository.findOne({
        where: { id: operationBefore.savingId },
      });
      await saving.update(
        {
          amount:
            saving.amount + operationBefore.amount - operationAfter.amount,
        },
        { transaction },
      );
    } else {
      const savingBefore = await this.savingRepository.findOne({
        where: { id: operationBefore.savingId },
      });
      const savingAfter = await this.savingRepository.findOne({
        where: { id: operationAfter.savingId },
      });
      await savingBefore.update(
        { amount: savingBefore.amount + operationBefore.amount },
        { transaction },
      );
      await savingAfter.update(
        { amount: savingAfter.amount - operationAfter.amount },
        { transaction },
      );
    }
  }
}
