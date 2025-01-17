import React from 'react';

import {VStack, Text, useDisclosure} from "@chakra-ui/react";

import MintRangedWeapon from "@/components/AptosArena/RangedWeaponSelect/MintRangedWeapon";
import EquipRangedWeapon from "@/components/AptosArena/RangedWeaponSelect/EquipRangedWeapon";
import Button from "@/components/Utilities/Button";
import Modal from "@/components/Utilities/Modal";
import CircularProgress from "@/components/Utilities/CircularProgress";

import useRangedWeapons from "@/hooks/aptosArena/useRangedWeapons";

const RangedWeapons = () => {

    const {
        rangedWeapons,
        hasPlayerMintedRangedWeapon,
        hasPlayerMintedLoading,
        rangedWeaponsLoading,
        mintRangedWeapon,
        equipRangedWeapon
    } = useRangedWeapons();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onSelect = async (rangedWeaponAddress: string) => {
        await equipRangedWeapon(rangedWeaponAddress)
        onClose()
    }

    const onMint = async () => {
        await mintRangedWeapon()
        onClose()
    }

    return (
        <>
            <Button
                buttonType={'primary'}
                onClick={onOpen}
            >
                Equip
            </Button>
            <Modal
                modalHeader={
                    <Text
                        fontSize={'4xl'}
                        textAlign={'center'}
                    >
                        Ranged Weapons
                    </Text>
                }
                modalBody={
                    <VStack>
                        {
                            hasPlayerMintedLoading ? (
                                <CircularProgress />
                            ) : (
                                hasPlayerMintedRangedWeapon ? (
                                    rangedWeaponsLoading ? (
                                        <CircularProgress isIndeterminate />
                                    ) : (
                                        rangedWeapons.length > 0 ? (
                                            rangedWeapons.map((rangedWeapon, index) => (
                                                <EquipRangedWeapon
                                                    key={index}
                                                    weaponName={rangedWeapon.name}
                                                    equipRangedWeapon={() => onSelect(rangedWeapon.address)}
                                                />
                                            ))
                                        ) : (
                                            <Text
                                                textAlign={'center'}
                                            >
                                                No Uneqipped Ranged Weapons
                                            </Text>
                                        )
                                    )
                                ) : (
                                    <MintRangedWeapon mintRangedWeapon={onMint} />
                                )
                            )
                        }
                    </VStack>
                }
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
            />
        </>
    );
};

export default RangedWeapons;
