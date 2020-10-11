import { PureComponent, ReactNode } from 'react'
import { View, Text, Button, ScrollView, Image } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import { PredictApi } from 'api/Case'
import styles from './styles'
import { Theme, APP_API_BASEURL } from 'configs'

export interface ParamsList {
  prediction?: PredictApi
}

interface State {
  data?: PredictApi
}

interface Props extends StackScreenProps<RootStackParamsList, 'Result'> {}

class Result extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    const { route } = props
    this.state = {
      data: route.params.prediction
    }
  }

  public done = (): void => {
    const { navigation } = this.props
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'VisitorInput' }]
      })
    )
  }

  public renderResult(): ReactNode {
    const { data } = this.state
    return data?.classification.map((item, idx) => (
      <Text key={idx} style={styles.classification}>
        {item.nama_penyakit} : {item.percentage}%
      </Text>
    ))
  }

  public render(): JSX.Element {
    const { data } = this.state
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Hasil Diagnosa</Text>
        <View style={styles.result}>{this.renderResult()}</View>
        <Text style={styles.subtitle}>Kesimpulan :</Text>
        <View style={styles.picContainer}>
          <Image
            style={styles.landingImage}
            source={{ uri: APP_API_BASEURL + data?.prediction.gambar_penyakit }}
          />
        </View>
        <Text style={{ fontSize: 16, marginVertical: 10 }}>
          Anda terindikasi Penyakit
          <Text style={styles.prediction}>
            &nbsp;{data?.prediction.nama_penyakit}.
          </Text>
        </Text>
        <Text style={styles.txt}>{data?.prediction.des_penyakit}</Text>
        <Text style={styles.txt}>Jika anda mengalami penyakit lupus, segera lakukan pemeriksaan ke dokter pemerhati lupus.</Text>
        <Text style={[styles.txt, styles.prediction, { marginTop: 10 }]}>
          Cara menanggulangi penyakit lupus.
        </Text>
        <Text style={styles.txt}>
          Meski penyakit lupus adalah penyakit yang tak dapat disembuhkan, namun odapus tetap bias hidup dengan damai dan mengurangi resiko gangguan yang mungkin muncul.
          Beberapa hal yang dapat dilakukan odapus untuk mencegah komplikasi muncul :
        </Text>
        <Text style={styles.txt}>
          1. <Text style={styles.prediction}>Melakukan olahraga dengan rutin</Text>. Odapus rentan mengalami gangguan pada sendi dan tulang. Tetap melakukan olahraga dengan rutin dapat membantu untuk menjaga kesehatan tulang dan sendi.
        </Text>
        <Text style={styles.txt}>
          2. <Text style={styles.prediction}>Berhenti merokok</Text>. Kebiasaan merokok hanya akan membuat penyakit ini bertambah parah, karena dapat meningkatkan resiko penyakit jantung, serangan jantung, dan pneumonia.
        </Text>
        <Text style={styles.txt}>
          3. <Text style={styles.prediction}>Istirahat yang cukup dan hindari stress</Text>. Stress hanya dapat membuat gejala lupus semakin parah. Maka dari itu, odapus harus banyak beristirahat dan menghindari stress.
        </Text>
        <Text style={styles.txt}>
          4. <Text style={styles.prediction}>Pahami tubuh</Text>. Para pasien dengan lupus harus tahu kapan gejala lupus muncul dan apa yang memicunya keluar. Misalnya saja, rasa letih muncul, maka odapus sebaiknya langsung beristirahat dengan cukup dan menghentikan segala kegiatannya terlebih dahulu.
        </Text>
        <Text style={styles.txt}>
          5. <Text style={styles.prediction}>Hindari paparan sinar matahari</Text>. Sinar matahari dapat memperburuk ruam kulit yang terjadi. Bila memang terpaksa untuk keluar disiang hari, sebaiknya gunakan tabir surya agar kulit terlindungi dari sinar matahari.
        </Text>
        <View style={[styles.btnContainer, { marginBottom: 50 }]}>
          <Button title="Selesai" color={Theme.success} onPress={this.done} />
        </View>
      </ScrollView>
    )
  }
}

export default Result
