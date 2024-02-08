import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { StyleSheet, View, Text } from 'react-native'
import { useCallback, useMemo, useRef } from 'react'
import { Button } from 'react-native'
import styles from './stylefile'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function Test() {
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], [])
  const bottomSheetRef = useRef(null)
  const handleClosePress = () => bottomSheetRef.current?.close()
  const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(1)

  const RenderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      {...props}
    ></BottomSheetBackdrop>
  ))
  return (
    <View style={styles.centerContainer}>
      <Button title='open' onPress={handleOpenPress} />
      <Button title='Close' onPress={handleClosePress} />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={RenderBackdrop}
      >
        <View>
          <Text>My Comment Matters!</Text>
        </View>
      </BottomSheet>
    </View>
  )
}
