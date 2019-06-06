import {
  Pregnant as PregnantEvent,
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
  Birth as BirthEvent,
  ContractUpgrade as ContractUpgradeEvent
} from "../generated/Contract/Contract"
import {
  Pregnant,
  Transfer,
  Approval,
  Birth,
  ContractUpgrade,
  CryptoKitty,
} from "../generated/schema"

export function handlePregnant(event: PregnantEvent): void {
  let entity = new Pregnant(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.matronId = event.params.matronId
  entity.sireId = event.params.sireId
  entity.cooldownEndBlock = event.params.cooldownEndBlock
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()

  let kitty = CryptoKitty.load(event.params.tokenId.toString());
  kitty.owner = event.params.to;
  kitty.save();
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleBirth(event: BirthEvent): void {
  let entity = new Birth(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.kittyId = event.params.kittyId
  entity.matronId = event.params.matronId
  entity.sireId = event.params.sireId
  entity.genes = event.params.genes
  entity.save()

  let kitty = new CryptoKitty(event.params.kittyId.toString());
  kitty.owner = event.params.owner
  kitty.kittyId = event.params.kittyId
  kitty.matronId = event.params.matronId
  kitty.sireId = event.params.sireId
  kitty.genes = event.params.genes
  kitty.birthTime = event.block.timestamp
  kitty.save()
}

export function handleContractUpgrade(event: ContractUpgradeEvent): void {
  let entity = new ContractUpgrade(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.newContract = event.params.newContract
  entity.save()
}
