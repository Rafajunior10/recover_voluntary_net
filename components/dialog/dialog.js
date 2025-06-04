import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Picker,
} from "react-native";

const Dialog = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <TextInput placeholder="Nome do Voluntário" style={styles.input} />
                    <TextInput placeholder="Idade do Voluntário" keyboardType="numeric" style={styles.input} />

                    {/* Horários Disponíveis */}
                    <View style={styles.pickerWrapper}>
                        <Picker style={styles.picker}>
                            <Picker.Item label="Selecione um horário" value="" />
                            <Picker.Item label="08:00 - 10:00" value="1" />
                            <Picker.Item label="10:00 - 12:00" value="2" />
                            <Picker.Item label="14:00 - 16:00" value="3" />
                        </Picker>
                    </View>

                    {/* Botões */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBtn} onPress={onClose}>
                            <Text style={styles.confirmText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    
    dialog: {
        backgroundColor: "white",
        width: "85%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },

    image: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginBottom: 15,
    },

    input: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },

    pickerWrapper: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
    },

    picker: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        color: "#000",
        paddingHorizontal: 10,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
    },

    cancelBtn: {
        backgroundColor: "#ccc",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },

    confirmBtn: {
        backgroundColor: "#eb4f4f",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
    },

    cancelText: {
        color: "#333",
        textAlign: "center",
        fontWeight: "bold",
    },

    confirmText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default Dialog;
